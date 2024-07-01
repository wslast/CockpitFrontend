/*
 * @Author: Junchi Zhao
 * @LastEditors: Please set LastEditors
 * @Description:
 */
// import SparkMD5 from 'spark-md5';
(function(window, undefined) {
	'use strict';
	function getEle(id) {
		return document.getElementById(id);
	}
	var UPLOADER_GUID = 0; //文件上传管理器唯一标示,多用于同一个页面存在多个管理器的情况
	//获取一些统一的配置信息
	var global_settings = window.uploader_setting ? window.uploader_setting : {};
	class Uploader {
		//修复constructor指向
		constructor(setting) {
			var self = this;
			self._inited = false; //是否初始化
			self.guid = setting.guid ? setting.guid : 'uploader-' + UPLOADER_GUID++;
			self.url = global_settings.url || setting.url;
			self.previewUrl = global_settings.previewUrl || setting.previewUrl;
			self.uploadBtn = setting.uploadBtn || [];
			self.params = global_settings.params || setting.params || {};
			self.fileView = setting.fileView || '';
			self.on = setting.on;
			self.limit = setting.limit || 10; //文件限制数量
			self.fileSplitSize = setting.fileSplitSize || 1024 * 1024 * 2; //分割大小
			self.fileArray = []; //文件上传数组
			self.result = setting.data ? setting.data : []; //上传结果
			self.autoUpload = setting.autoUpload ? setting.autoUpload : false;
			self.singleFile = setting.singleFile ? setting.singleFile : false;
			self.initBtn(setting.uploadBtn);
			self.initView(setting.fileView);
			if (self.autoUpload) {
				document.querySelector('#submit' + self.guid).style.display = 'none';
			}
			if (self.singleFile) {
				document.querySelector('#file' + self.guid).removeAttribute('multiple');
			}
			self.setView(setting)._init();
		}
		setView(setting) {
			var self = this;
			self.eleForm = getEle('form' + self.guid); //上传表单
			self.eleFile = getEle('file' + self.guid); //上传按钮
			self.eleSubmit = getEle('submit' + self.guid); //上传确定按钮
			self.eleUploadUl = getEle('uploadUl' + self.guid); // 文件等待上传列表的容器
			self.eleTemplate = self.fileViewTmpl(); // 模板元素
			self.htmlTemplate = self.fileViewTmpl() || '';
			return self;
		}
		_init() {
			var self = this;
			if (self._inited) return;
			self._inited = true;
			var guid = self.guid,
				container = self.container;
			// 一些元素的状态
			var objStateElement = (function() {
				var _$ = function(name, fileid) {
					return (
						document.querySelector('#file' + name + '_' + fileid) || {
							innerHTML: '',
						}
					);
				};

				return {
					// 上传进度条背景的控制
					backgroundSize: function(params, percent) {
						var dom =
							typeof params == 'string' ? getEle('filelist_' + params) : params;
						if (dom) {
							dom.style.mozBackgroudSize = percent + '% 100%';
							dom.style.backgroundSize = percent + '% 100%';
						}
					},
					wait: function(fileid) {
						// 一些状态的改变
						_$('status', fileid).innerHTML =
							'<span class="uploading">上传中...</span>';
						_$('operate', fileid).innerHTML =
							'<a href="javascript:" data-type="pause" data-id="' +
							fileid +
							'">暂停</a>';
					},
					keep: function(fileid) {
						_$('status', fileid).innerHTML =
							'<span class="waiting">等待续传...</span>';
					},
					success: function(fileid, time, fileInfo) {
						var eleList = getEle('filelist_' + fileid),
							eleOperate = getEle('fileoperate_' + fileid),
							eleStatus = getEle('filestatus_' + fileid);

						// 进度条隐藏
						this.backgroundSize(eleList, '0');

						// 删除本地存储的起点，完全上传成功，因此没有续传的必要
						localStorage.removeItem(fileid);
						// 状态信息再变化
						eleStatus.innerHTML =
							'<span class="success">' +
							(performance.now() - time > 1000 ? '上' : '上') +
							'传成功！</span>';
						eleOperate.innerHTML = '';
						if (fileInfo) {
							_$('operate', fileid).innerHTML =
								'<a href="javascript:" data-type="preview" data-id="' +
								fileid +
								'" data-info="' +
								fileInfo +
								'" style="margin-right:10px;">预览</a>' +
								'<a href="javascript:" data-type="delete" data-id="' +
								fileid +
								'" data-info="' +
								fileInfo +
								'">删除</a>';
						}
						// 因为元素不会删除，因此，有必要清除id
						// eleStatus.id = "";
						// eleList.id = "";
						// eleOperate.id = "";
					},
					error: function(fileid) {
						// 状态信息再变化
						_$('status', fileid).innerHTML =
							'<span class="error">出现异常！</span>';
						_$('operate', fileid).innerHTML =
							'<a href="javascript:" data-type="try" data-id="' +
							fileid +
							'">重试</a>';
					},
				};
			})();
			if (self.result && self.result.length > 0) {
				self.initData(self.result, objStateElement);
				for (const iterator of self.result) {
					var now = performance.now();
					var fileInfo =
						iterator.fileHash +
						'?fullfilename=' +
						(iterator.aliases
							? iterator.aliases
							: iterator.fileId + '.' + iterator.fileType);
					objStateElement.success(
						iterator.fileId ? iterator.fileId : iterator.fileHash,
						now,
						fileInfo
					);
				}
			}
			// 单文件上传
			var funFileUpload = function(fileid, onsuccess, onerror, onpause) {
				var file = self.fileArray[fileid],
					now = performance.now();
				if (!fileid || !file) {
					self.on && self.on.complete && self.on.complete(self.result);
					return;
				}
				onsuccess =
					onsuccess ||
					function() {
						funFileUpload(self.fileArray[0]);
					};
				onerror =
					onerror ||
					function() {
						funFileUpload(self.fileArray[self.fileArray.indexOf(fileid) + 1]);
					};
				onpause =
					onpause ||
					function() {
						funFileUpload(self.fileArray[self.fileArray.indexOf(fileid) + 1]);
					};
				if (file.flagPause == true) {
					onpause.call(fileid);
					return;
				}
				objStateElement.wait(fileid);
				// 文件分割上传
				// 文件大小和分割起点
				// 注释的是本地存储实现
				var size = file.size,
					start = localStorage[fileid] * 1 || 0; //start = getEle("filelist_" + fileid).filesize;
				if (size == start) {
					// 已经传过了
					self.fileArray.shift();
					// if (delete self.fileArray[fileid]) console.log(self.fileArray.join() + "---上传成功");
					objStateElement.success(fileid, now);
					// 回调
					onsuccess.call(fileid, {});
					return;
				}

				var funFileSize = async () => {
					if (file.flagPause == true) {
						onpause.call(fileid);
						return;
					}
					var data = new FormData();
					if (size <= self.fileSplitSize) {
						data.append('file', file);
						data.append('aliases', file.name);
					} else {
						if (!file.wholeFileId) {
							var whole = await getWholeId(file);
							file.wholeFileId = whole.wholeFileId;
							file.fileHash = whole.fileHash;
						}
						var chunkNum = Math.ceil(start / self.fileSplitSize); //获取分块个数
						var chuckFile = new File(
							[file.slice(start, start + self.fileSplitSize)],
							chunkNum + '.part'
						);
						var isNeedUpload = await getFileHash(
							chuckFile,
							file.wholeFileId,
							chunkNum
						);
						if (isNeedUpload) {
							if (start + self.fileSplitSize >= size) {
								// 超出，说明全部分割上传完毕
								// 上传队列中清除者一项
								if (file.wholeFileId) {
									//块文件重建文件对象
									var response = {
										aliases: file.name,
										contentType: '',
										fileBak1: '',
										fileBak2: '',
										fileHash: file.wholeFileId
											? file.wholeFileId
											: file.fileHash,
										fileId: file.fileId ? file.fileId : file.wholeFileId,
										fileName: file.name,
										filePath: '',
										fileSize: file.size,
										fileType: file.name.split('.')[
											file.name.split('.').length - 1
										],
										id: file.fileId ? file.fileId : file.wholeFileId,
									};
									self.result.push(response);
								} else {
									self.result.push(file);
								}
								self.fileArray.shift();
								let fileInfo = '';
								if (file.wholeFileId) {
									fileInfo =
										file.wholeFileId +
										'?fullfilename=' +
										(file.aliases ? file.aliases : file.name);
								} else {
									fileInfo =
										file.fileHash +
										'?fullfilename=' +
										(file.aliases ? file.aliases : file.name);
								}
								objStateElement.success(fileid, now, fileInfo);
								// 回调
								onsuccess.call(fileid, file);
							} else {
								// 尚未完全上传完毕
								// 存储上传成功的文件点，以便出现意外的时候，下次可以断点续传
								localStorage.setItem(fileid, start + '');
								// 改变下一部分文件的起点位置
								start += self.fileSplitSize;
								objStateElement.backgroundSize(fileid, (start / size) * 100);
								// 上传下一个分割文件
								funFileSize();
							}
							return;
						} else {
						}
						data.append('aliases', file.name);
						data.append('wholeFileId', file.wholeFileId);
						data.append('file', chuckFile);
						data.append('chunkNum', chunkNum);
					}
					// XMLHttpRequest 2.0 请求
					var xhr = new XMLHttpRequest();
					xhr.open('post', self.eleForm.action, true);
					for (const objKey in self.params) {
						xhr.setRequestHeader(objKey, self.params[objKey]);
					}

					// 上传进度中
					xhr.upload.addEventListener(
						'progress',
						function(e) {
							objStateElement.backgroundSize(
								fileid,
								((e.loaded + start) / size) * 100
							);
						},
						false
					);
					// ajax成功后
					xhr.onload = () => {
						try {
							var json = JSON.parse(xhr.responseText);
						} catch (e) {
							objStateElement.error(fileid);
							return;
						}
						//var json = JSON.parse(xhr.responseText);
						if (!json || json.retHead.code != '0000000') {
							objStateElement.error(fileid);
							onerror.call(fileid, json);
							return;
						}
						if (start + self.fileSplitSize >= size) {
							// 超出，说明全部分割上传完毕
							// 上传队列中清除者一项
							file.fileId = file.fileHash || json.retBody.fileHash;
							if (file.wholeFileId) {
								//块文件重建文件对象
								var response = {
									aliases: file.name,
									contentType: '',
									fileBak1: '',
									fileBak2: '',
									fileHash: file.wholeFileId ? file.wholeFileId : file.fileHash,
									fileId: file.wholeFileId ? file.wholeFileId : file.fileId,
									fileName: file.name,
									filePath: '',
									fileSize: file.size,
									fileType: file.name.split('.')[
										file.name.split('.').length - 1
									],
									id: file.wholeFileId ? file.wholeFileId : file.fileId,
								};
								self.result.push(response);
							} else {
								self.result.push(json.retBody);
							}
							self.fileArray.shift();
							let fileInfo = '';
							if (file.wholeFileId) {
								fileInfo =
									file.wholeFileId +
									'?fullfilename=' +
									(json.retBody.aliases
										? json.retBody.aliases
										: json.retBody.id + '.' + json.retBody.fileType);
							} else {
								fileInfo =
									file.fileId +
									'?fullfilename=' +
									(json.retBody.aliases
										? json.retBody.aliases
										: json.retBody.id + '.' + json.retBody.fileType);
							}
							objStateElement.success(fileid, now, fileInfo);
							// 回调
							onsuccess.call(fileid, json);
						} else {
							// 尚未完全上传完毕
							// 存储上传成功的文件点，以便出现意外的时候，下次可以断点续传
							localStorage.setItem(fileid, start + '');
							// 改变下一部分文件的起点位置
							start += self.fileSplitSize;
							// 上传下一个分割文件
							funFileSize();
						}
					};
					xhr.onerror = function() {
						objStateElement.error(fileid);
						self.on &&
							self.on.remove &&
							self.on.error(
								self.fileArray[fileid],
								self.fileArray,
								self.result
							);
					};

					xhr.send(data);
				};
				var getFileHash = async function(bigFile, wholeFileId, chunkNum) {
					return new Promise((resolve, reject) => {
						var blobSlice =
								File.prototype.slice ||
								File.prototype.mozSlice ||
								File.prototype.webkitSlice,
							file = bigFile,
							chunkSize = self.fileSplitSize, // Read in chunks of 2MB
							chunks = Math.ceil(file.size / chunkSize),
							currentChunk = 0,
							spark = new SparkMD5(),
							fileReader = new FileReader();

						fileReader.onload = function(e) {
							spark.append(e.target.result); // Append array buffer
							currentChunk++;
							if (currentChunk < chunks) {
								loadNext();
							} else {
								var params = {
									wholeFileId: wholeFileId,
									fileHash: spark.end(),
									chunkNum: chunkNum,
								};
								var xhr = new XMLHttpRequest();
								xhr.open('post', self.previewUrl + '/api/file/check', true);
								xhr.setRequestHeader(
									'Content-Type',
									'application/x-www-form-urlencoded;charset=UTF-8'
								);
								xhr.onload = function() {
									try {
										var json = JSON.parse(xhr.responseText);
										if (json && json.retHead.code === '0000000') {
											resolve(json.retBody);
										} else {
											reject();
										}
									} catch (e) {
										objStateElement.error(fileid);
										reject();
									}
								};
								xhr.error = function() {
									reject();
								};
								xhr.send(new URLSearchParams(params).toString());
							}
						};

						fileReader.onerror = function() {
							console.warn('oops, something went wrong.');
						};

						function loadNext() {
							var start = currentChunk * chunkSize,
								end =
									start + chunkSize >= file.size
										? file.size
										: start + chunkSize;

							fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
						}

						loadNext();
					});
				};
				var getWholeId = async function(bigFile) {
					return new Promise((resolve, reject) => {
						var blobSlice =
								File.prototype.slice ||
								File.prototype.mozSlice ||
								File.prototype.webkitSlice,
							file = bigFile,
							chunkSize = self.fileSplitSize, // Read in chunks of 2MB
							chunks = Math.ceil(file.size / chunkSize),
							currentChunk = 0,
							spark = new SparkMD5(),
							fileReader = new FileReader();

						fileReader.onload = function(e) {
							spark.append(e.target.result); // Append array buffer
							currentChunk++;
							if (currentChunk < chunks) {
								loadNext();
							} else {
								var params = {
									fileName: file.name,
									fileType: file.type
										? file.type
										: file.name.split('.')[file.name.split('.').length - 1],
									fileHash: spark.end(),
									fileSize: file.size,
									chunkSize: self.fileSplitSize,
								};
								var xhr = new XMLHttpRequest();
								xhr.open('post', self.previewUrl + '/api/file/crewfid', true);
								xhr.setRequestHeader(
									'Content-Type',
									'application/x-www-form-urlencoded;charset=UTF-8'
								);
								xhr.onload = function() {
									try {
										var json = JSON.parse(xhr.responseText);
										if (json && json.retHead.code === '0000000') {
											resolve(json.retBody);
										} else {
											reject();
										}
									} catch (e) {
										objStateElement.error(fileid);
										reject();
									}
								};
								xhr.error = function() {
									reject();
								};
								xhr.send(new URLSearchParams(params).toString());
							}
						};

						fileReader.onerror = function() {
							console.warn('oops, something went wrong.');
						};

						function loadNext() {
							var start = currentChunk * chunkSize,
								end =
									start + chunkSize >= file.size
										? file.size
										: start + chunkSize;

							fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
						}

						loadNext();
					}).catch((res) => {
						console.log(res);
					});
				};
				// 文件分割上传开始
				funFileSize();
			};

			// IE10+, Chrome, FireFox等
			self.eleForm.addEventListener('submit', function(event) {
				if (self.on && self.on.before && !self.on.before()) {
					event.preventDefault();
					return;
				}
				funFileUpload(self.fileArray[0]);
				event.preventDefault();
			});

			// 选择文件后
			self.eleFile.addEventListener('change', (event) => {
				// 获取文件
				var files = event.target.files;
				if (files.length + self.result.length > self.limit) {
					self.on &&
						self.on.limitNotice &&
						self.on.limitNotice(files, self.fileArray, self.result);
					return;
				}
				self.setData(files, objStateElement);
				if (self.autoUpload) {
					document.querySelector('#submit' + self.guid).click();
				}
			});
			// 文件删除等委托事件
			self.eleUploadUl.addEventListener('click', (event) => {
				var target = event.target,
					id = target && target.getAttribute('data-id');
				if (id && /^a$/i.test(target.tagName)) {
					switch (target.getAttribute('data-type')) {
						case 'delete': {
							var filelist = document.querySelector('#filelist_' + id);
							if (filelist) {
								filelist.style.opacity = 0;
								// 源数据清除
								var removeFile = self.fileArray[id]
									? JSON.parse(JSON.stringify(self.fileArray[id]))
									: null;
								if (removeFile) {
									self.fileArray.splice(self.fileArray.indexOf(id), 1);
								}
								console.log(target.getAttribute('data-info'));
								if (target.getAttribute('data-info')) {
									var realId = target.getAttribute('data-info').split('?')[0];
									console.log(realId);
									for (
										var index = self.result.length - 1;
										index >= 0;
										index--
									) {
										console.log(self.result[index].fileId);
										console.log(self.result[index].fileHash);
										console.log(self.result[index].realId);
										console.log('-----------------------');
										if (
											self.result[index].fileId === realId ||
											self.result[index].fileHash === realId
										) {
											removeFile = JSON.parse(
												JSON.stringify(self.result[index])
											);
											console.log(index);
											self.result.splice(index, 1);
										}
									}
								} else {
									for (
										var index = self.result.length - 1;
										index >= 0;
										index--
									) {
										if (
											self.result[index].fileId === id ||
											self.result[index].fileHash === id
										) {
											removeFile = JSON.parse(
												JSON.stringify(self.result[index])
											);
											self.result.splice(index, 1);
										}
									}
								}
								// 删除回调
								self.on &&
									self.on.remove &&
									self.on.remove(removeFile, self.fileArray, self.result);
								setTimeout(function() {
									filelist.parentNode.removeChild(filelist);
									if (self.fileArray.length == 0) {
										self.eleSubmit.style.visibility = 'hidden';
										// self.eleUploadUl.style.display = "none";
									}
								}, 220);
							}
							break;
						}
						case 'pause': {
							var eleStatus = getEle('filestatus_' + id);
							if (self.fileArray[id]) {
								self.fileArray[id].flagPause = true;
								// funFileUpload(self.fileArray[id])
								target.setAttribute('data-type', 'reupload');
								target.innerHTML = '继续';
								if (eleStatus) eleStatus.innerHTML = '上传暂停';
							}
							break;
						}
						case 'preview': {
							var fileUrl =
								self.previewUrl +
								'/api/file/downloadFile/' +
								target.getAttribute('data-info');
							window.open(
								self.previewUrl +
									'/onlinePreview?url=' +
									window.encodeURIComponent(
										window.btoa(unescape(encodeURIComponent(fileUrl)))
									)
							);
							console.log(fileUrl);
							break;
						}
						case 'try':
						case 'reupload': {
							self.fileArray[id].flagPause = false;
							funFileUpload(id);
						}
					}
				}
			});
		}
		initBtn(id) {
			if (!id) return;
			var self = this;
			if (typeof id === 'string') {
				getEle(id).innerHTML =
					'<form id="form' +
					self.guid +
					'" class="form" action="' +
					self.url +
					'/api/file/upload' +
					'">' +
					'<input type="file" id="file' +
					self.guid +
					'" class="file" name="file[]" multiple=' +
					self.singleFile +
					'><span class="btn btn-info">请选择要上传的文件</span>' +
					'<input type="submit" id="submit' +
					self.guid +
					'" class="btn btn-primary" value="上传">' +
					'</form>';
			} else {
				id.innerHTML =
					'<form id="form' +
					self.guid +
					'" class="form" action="' +
					self.url +
					'/api/file/upload' +
					'">' +
					'<input type="file" id="file' +
					self.guid +
					'" class="file" name="file[]" multiple=' +
					self.singleFile +
					'><span class="btn btn-info">请选择要上传的文件</span>' +
					'<input type="submit" id="submit' +
					self.guid +
					'" class="btn btn-primary" value="上传">' +
					'</form>';
			}
		}
		initView(id) {
			if (!id) return;
			var self = this;
			if (typeof id === 'string') {
				getEle(id).className += ' ' + 'upload';
				getEle(id).innerHTML =
					'<ul id="uploadUl' +
					self.guid +
					'" class="upload_ul">' +
					'<li class="upload_title">' +
					' <div class="upload_cell">文件名</div>' +
					' <div class="upload_cell">类型</div>' +
					' <div class="upload_cell">大小</div>' +
					' <div class="upload_cell">状态</div>' +
					' <div class="upload_cell">操作</div>' +
					'</li>' +
					'</ul>';
			} else {
				id.className += ' ' + 'upload';
				id.innerHTML =
					'<ul id="uploadUl' +
					self.guid +
					'" class="upload_ul">' +
					'<li class="upload_title">' +
					' <div class="upload_cell">文件名</div>' +
					' <div class="upload_cell">类型</div>' +
					' <div class="upload_cell">大小</div>' +
					' <div class="upload_cell">状态</div>' +
					' <div class="upload_cell">操作</div>' +
					'</li>' +
					'</ul>';
			}
		}
		fileViewTmpl(data) {
			return (
				'<li id="filelist_$id$">' +
				'	<div class="upload_cell">$name$</div>' +
				'	<div class="upload_cell"><i class="icon icon-$type$"></i></div>' +
				'	<div class="upload_cell">$size$</div>' +
				'	<div id="filestatus_$id$" class="upload_cell">$status$</div>' +
				'	<div id="fileoperate_$id$" class="upload_cell">$operate$</div>' +
				'</li>'
			);
		}
		initData(files, objStateElement) {
			var self = this;
			// 遍历文件，显示文件列表信息
			var htmlFile = '',
				index = 0,
				length = files.length;
			if (JSON.stringify(files) === JSON.stringify(self.result)) {
				if (length > self.limit) {
					self.on.limitNotice && self.on.limitNotice(files, self.fileArray);
					return;
				}
			} else {
				if (length + self.result.length > self.limit) {
					self.on.limitNotice && self.on.limitNotice(files, self.fileArray);
					return;
				}
			}
			for (; index < length; index++) {
				var file = files[index];
				var name = file.name || file.fileName || '',
					size = file.size || file.fileSize || 0,
					type = file.type || file.fileType || '',
					id =
						file.fileId ||
						file.fileHash ||
						(file.lastModifiedDate + '').replace(/\W/g, '') +
							size +
							type.replace(/\W/g, '');
				var objHtml = {
					id: id,
					type: 'cloud',
					name: name,
					size: size + 'B',
					status: '<span class="waiting">等待上传</span>',
					operate:
						'<a href="javascript:" data-type="delete" data-id="' +
						id +
						'">删除</a>',
				};
				// name 50字符限制
				if (name.length > 50) {
					objHtml.name =
						'<span title="' +
						name +
						'">' +
						name.slice(0, 20) +
						'...' +
						name.slice(-20) +
						'</span>';
				}

				// 文件类型与对应的图标
				var format = name.split('.');
				if (format.length > 1) {
					objHtml.type = format[format.length - 1] || 'unknown';
				} else {
					objHtml.type = type || 'unknown';
				}
				// 如果大小大于1M使用'M'为单位表示, 1位小数点
				if (size > 1024 * 1024) {
					objHtml.size = Math.round((size / (1024 * 1024)) * 10) / 10 + 'M';
				} else if (size > 1024) {
					// 如果大小大于1KB使用'KB'为单位表示, 1位小数点
					objHtml.size = Math.round((size / 1024) * 10) / 10 + 'KB';
				}

				if (size > 1024 * 1024 * 1024 * 1024) {
					// 如果文件大于1GB, 状态为'大小溢出'
					objHtml.id = Math.random();
					objHtml.status = '<span class="error">文件过大</span>';
					objHtml.operate = '';
				} else if (self.fileArray.indexOf(id) != -1) {
					// 如果文件已经在列表中
					objHtml.id = Math.random();
					objHtml.status = '<span class="error">文件已存在</span>';
					objHtml.operate = '';
				} else if (file.fileId) {
				} else {
					// 加入文件队列，并缓存对应的文件二进制对象
					self.fileArray.push(id);
					self.fileArray[id] = file;
				}

				htmlFile += self.htmlTemplate.replace(/\$\w+\$/gi, function(matchs) {
					var returns = objHtml[matchs.replace(/\$/g, '')];
					return returns + '' == 'undefined' ? '' : returns;
				});
			}
			// 载入HTML
			if (htmlFile !== '') {
				self.eleSubmit.style.visibility = 'visible';
				self.eleUploadUl.style.display = 'table';
				self.eleUploadUl.insertAdjacentHTML('beforeEnd', htmlFile);

				// 初始化进度条

				// 下面注释的是本地存储方法
				self.fileArray.forEach(function(fileid) {
					var loaded = localStorage[fileid] * 1;
					if (loaded > 0) {
						objStateElement.backgroundSize(
							fileid,
							(loaded / self.fileArray[fileid].size) * 100
						);
					}
				});
				getEle('filelist_' + id).filesize = 0;
			}
			self.eleForm.reset();
		}
		setData(files, objStateElement) {
			var self = this;
			// 遍历文件，显示文件列表信息
			var htmlFile = '',
				index = 0,
				length = files.length;
			if (JSON.stringify(files) === JSON.stringify(self.result)) {
				if (length > self.limit) {
					self.on &&
						self.on.limitNotice &&
						self.on.limitNotice(files, self.fileArray);
					return;
				}
			} else {
				if (length + self.result.length > self.limit) {
					self.on &&
						self.on.limitNotice &&
						self.on.limitNotice(files, self.fileArray);
					return;
				}
			}
			for (; index < length; index++) {
				var file = files[index];
				var name = file.name || file.fileName,
					size = file.size || file.fileSize,
					type = file.type || file.fileType || '',
					id =
						file.fileId ||
						(file.lastModifiedDate + '').replace(/\W/g, '') +
							size +
							type.replace(/\W/g, '');
				var objHtml = {
					id: id,
					type: 'cloud',
					name: name,
					size: size + 'B',
					status: '<span class="waiting">等待上传</span>',
					operate:
						'<a href="javascript:" data-type="delete" data-id="' +
						id +
						'">删除</a>',
				};
				// name 50字符限制
				if (name.length > 50) {
					objHtml.name =
						'<span title="' +
						name +
						'">' +
						name.slice(0, 20) +
						'...' +
						name.slice(-20) +
						'</span>';
				}
				console.log(name);
				// 文件类型与对应的图标
				var format = name.split('.');
				if (format.length > 1) {
					objHtml.type = format[format.length - 1] || 'unknown';
				} else {
					objHtml.type = type || 'unknown';
				}
				// 如果大小大于1M使用'M'为单位表示, 1位小数点
				if (size > 1024 * 1024) {
					objHtml.size = Math.round((size / (1024 * 1024)) * 10) / 10 + 'M';
				} else if (size > 1024) {
					// 如果大小大于1KB使用'KB'为单位表示, 1位小数点
					objHtml.size = Math.round((size / 1024) * 10) / 10 + 'KB';
				}

				if (size > 1024 * 1024 * 1024 * 1024) {
					// 如果文件大于1GB, 状态为'大小溢出'
					objHtml.id = Math.random();
					objHtml.status = '<span class="error">文件过大</span>';
					objHtml.operate = '';
				} else if (
					self.fileArray.indexOf(id) != -1 ||
					self.result.find((file) => {
						return (
							file.fileName === name ||
							file.fileName === format[format.length - 1] ||
							file.aliases === name
						);
					})
				) {
					// 如果文件已经在列表中
					objHtml.id = Math.random();
					objHtml.status = '<span class="error">文件已存在</span>';
					objHtml.operate = '';
					return;
				} else if (file.fileId) {
				} else {
					// 加入文件队列，并缓存对应的文件二进制对象
					self.fileArray.push(id);
					self.fileArray[id] = file;
				}

				htmlFile += self.htmlTemplate.replace(/\$\w+\$/gi, function(matchs) {
					var returns = objHtml[matchs.replace(/\$/g, '')];
					return returns + '' == 'undefined' ? '' : returns;
				});
			}
			// 载入HTML
			if (htmlFile !== '') {
				self.eleSubmit.style.visibility = 'visible';
				self.eleUploadUl.style.display = 'table';
				self.eleUploadUl.insertAdjacentHTML('beforeEnd', htmlFile);

				// 初始化进度条
				self.fileArray.forEach(function(fileid) {
					var loaded = localStorage[fileid] * 1;
					if (loaded > 0) {
						objStateElement.backgroundSize(
							fileid,
							(loaded / self.fileArray[fileid].size) * 100
						);
					}
				});
				if (getEle('filelist_' + id) && getEle('filelist_' + id).filesize) {
					getEle('filelist_' + id).filesize = 0;
				}
			}
			self.eleForm.reset();
		}
	}
	window.Uploader = Uploader;
})(window);
export default Uploader;
