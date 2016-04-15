function inherit(t){function e(){}return Object.create?Object.create(t):"function"!=typeof t&&"object"!=typeof t?(e.prototype=t,new e):void 0}function getEventPosition(t){var e,i;return t.layerX||0==t.layerX?(e=t.layerX,i=t.layerY):(t.offsetX||0==t.offsetX)&&(e=t.offsetX,i=t.offsetY),{x:e,y:i}}function sortBy(t){return function(e,i){var a=e[t],s=i[t];return a>s?-1:s>a?1:0}}function NChart(t,e){switch(e){case"pie":this.type=Pie;break;case"bar":this.type=Bar;break;case"radar":this.type=Radar;break;case"ring":this.type=Pie;break;case"line":this.type=Line}return new this.type(t,e)}function Element(t){this.context=t}function Pie(t,e){this.type=e,Element.apply(this,[t]),this.color=["yellow","pink","blue","green","orange","black","red"],this.deg=[],this.value=[]}function Radar(t,e){return Element.apply(this,[t]),this.type=e,this.color=["red","green","blue","black","orange","brown"],this}function Bar(t,e){this.type=e,Element.apply(this,[t]),this.color=["red","yellow","blue","green","orange","brown"],this.value=[]}function Line(t,e){return this.type=e,Element.apply(this,[t]),this.color=["red","green","blue","black","orange","brown"],this}Element.prototype.config=function(t){for(prop in t)this[prop]=t[prop];if(this.data&&this.index){this.rad=360/this.index.length;var e=0;this.max=0;for(var i=0;i<this.data.length;i++)e=Math.max.apply(null,this.data[i].value),this.max=this.max>e?this.max:e;for(this.levels=5,this.distance=1;this.distance*this.levels<this.max;)this.distance=this.distance+1}if(this.data&&"[object Array]"!=Object.prototype.toString.call(this.data[0].value)&&"[object Function]"!=Object.prototype.toString.call(this.data[0].value)&&(this.data=this.data.sort(sortBy("value"))),this.data&&this.data[0].type){this.group=[],this.data.forEach(function(t){this[t.type]?(this[t.type]=this[t.type].concat(t.value),this.group[t.type]=this[t.type]):(this[t.type]=t.value,this.group[[t.type]]=t.value,this.group.length=this.group.length+1)}.bind(this)),this.max=0;for(item in this.group)for(var a=this.group[item],s=a.length/this.xAxis.length,e=0,l=0;l<this.xAxis.length;l++){for(var i=0;s>i;i++)e=this.group[item][l+6*i]+e;this.max=e>this.max?e:this.max,e=0}for(this.distance=5;6*this.distance<this.max;)this.distance=this.distance+5}if(this.data&&"line"==this.type){this.max=0;for(var i=0;i<this.data.length;i++)for(var l=0;l<this.data[i].value.length;l++)this.max=this.max>this.data[i].value[l]?this.max:this.data[i].value[l];for(this.distance=5;6*this.distance<this.max;)this.distance=this.distance+5}return this.configMessage(),this},Pie.prototype=inherit(Element.prototype),Pie.constructor=Pie,Pie.prototype.addEvent=function(t,e){var i=-Math.PI/2,a=this.circleCenter,s=this.radius,l=document.createElement("div");l.style.padding="10px",l.style.color="white",l.style.backgroundColor="rgba(0,0,0,0.45)",l.style.display="none",document.body.appendChild(l),t.addEventListener("mousemove",function(t){var h,o=getEventPosition(t);e.clearRect(0,0,9999,9999);for(var r=0;r<=this.deg.length-1;r++){if(e.strokeStyle=this.color[r],e.beginPath(),e.moveTo(a,a),e.arc(a,a,s,i,this.deg[r]+i),i=this.deg[r]+i,e.globalAlpha=.4,e.fillStyle=this.color[r],e.fill(),e.isPointInPath(o.x,o.y)){e.clearRect(0,0,9999,9999),h=r,i=-Math.PI/2;for(var r=0;r<=this.deg.length-1;r++)e.strokeStyle=this.color[r],e.beginPath(),e.moveTo(a,a),r!=h?e.arc(a,a,s,i,this.deg[r]+i):e.arc(a,a,s+20,i,this.deg[r]+i),i=this.deg[r]+i,e.fillStyle=this.color[r],e.globalAlpha=.4,e.fill()}"ring"==this.type&&(e.beginPath(),e.arc(a,a,s/2.5,0,2*Math.PI),e.fillStyle="white",e.globalAlpha=1,e.fill())}var n=Math.pow(o.x-a,2)+Math.pow(o.y-a,2);if(this.message&&n<Math.pow(s-5,2))for(var r=0;r<this.mge.length;r++){var d=this.mge[r].replace(/{{name}}/,this.data[h].name);l.style.display="block",l.style.position="absolute",l.style.left=t.clientX+20+"px",l.style.top=t.clientY+20+"px";var g=(d.replace(/{{value}}/,this.data[h].value),this.message.replace(/{{name}}/,this.data[h].name).replace(/{{value}}/,this.data[h].value));l.innerHTML=g}else l.style.display="none";t.stopPropagation()}.bind(this)),t.addEventListener("mouseout",function(t){t.stopPropagation();var i=-Math.PI/2;e.clearRect(0,0,9999,9999);for(var l=0;l<=this.deg.length-1;l++)e.fillStyle=this.color[l],e.strokeStyle=this.color[l],e.beginPath(),e.moveTo(a,a),e.arc(a,a,s,i,this.deg[l]+i),i=this.deg[l]+i,e.globalAlpha=.4,e.fill(),"ring"==this.type&&(e.beginPath(),e.arc(a,a,s/2.5,0,2*Math.PI),e.fillStyle="white",e.globalAlpha=1,e.fill())}.bind(this))},Pie.prototype.draw=function(){var t=this.context,e=t.canvas,i=e.offsetHeight,a=e.offsetWidth,s=a>i?i/2:a/2;this.circleCenter=s;var l=i>a?(a-30)/2:(i-30)/2;l-=30,this.radius=l,this.value=this.data.map(function(t){return t.value});var h=this.value.reduce(function(t,e){return t+e});this.deg=this.value.map(function(t){var e=360*t/h;return e*Math.PI/180}),this.percent=this.value.map(function(t){return t/h});var o=-Math.PI/2;t.clearRect(0,0,9999,9999);for(var r=0;r<=this.deg.length-1;r++)t.fillStyle=this.color[r],t.strokeStyle=this.color[r],t.beginPath(),t.moveTo(s,s),t.arc(s,s,l,o,this.deg[r]+o),o=this.deg[r]+o,t.globalAlpha=.4,t.fill(),"ring"==this.type&&(t.beginPath(),t.arc(s,s,l/2.5,0,2*Math.PI),t.fillStyle="white",t.globalAlpha=1,t.fill());return this.addEvent(e,t),this},Pie.prototype.configMessage=function(){this.message&&this.data&&(this.mge=[],this.message=this.message.replace(/ \s+/g,""),this.mge=this.message.split("/n"))},Radar.prototype=inherit(Element.prototype),Radar.constructor=Radar,Radar.prototype.draw=function(){var t=this.context,e=t.canvas,i=e.offsetHeight,a=e.offsetWidth,s=a>i?i/2:a/2;this.circleCenter=s;var l=i>a?(a-30)/2:(i-30)/2;l-=30,this.radius=l,t.clearRect(0,0,9999,9999),t.translate(s,s);for(var h=this.levels;h>0;h--)for(var o=this.radius*(5*this.distance-(h-1)*this.distance)/(5*this.distance),r=0;r<this.index.length;r++){t.beginPath(),t.globalAlpha=.4,t.rotate(this.rad*Math.PI/180),t.moveTo(0,0),t.lineTo(0,-o),1!=h?t.strokeStyle="rgba(0,0,0,0)":t.strokeStyle="black",t.stroke(),t.beginPath(),t.moveTo(0,-o);var n=o*Math.sin(this.rad*Math.PI/180),d=o*Math.cos(this.rad*Math.PI/180);t.strokeStyle="black",t.lineTo(n,0-d),t.stroke()}t.translate(-s,-s);for(var r=0;r<this.index.length;r++){var g=r*this.rad,n=s+Math.sin(g*Math.PI/180)*(this.radius+8),d=s-Math.cos(g*Math.PI/180)*(this.radius+8);0==g||g>84&&96>g?t.textAlign="center":180>g?t.textAlign="left":t.textAlign="right",t.fillStyle="black",t.fillText(this.index[r],n,d)}for(var h=0;h<this.data.length;h++){t.beginPath();for(var r=0;r<this.index.length;r++){var c=this.data[h].value[r]*this.radius/(5*this.distance),g=r*this.rad,n=s+Math.sin(g*Math.PI/180)*c,d=s-Math.cos(g*Math.PI/180)*c;0==r?t.moveTo(n,d):t.lineTo(n,d)}t.closePath(),t.fillStyle=this.color[h],t.fill()}return this.addEvent(e,t),this},Radar.prototype.addEvent=function(t,e){var i=document.createElement("div");i.style.padding="10px",i.style.color="white",i.style.backgroundColor="rgba(0,0,0,0.45)",i.style.display="none",document.body.appendChild(i),t.addEventListener("mousemove",function(a){e.clearRect(0,0,9999,9999);var s=getEventPosition(a),l=[],h=t.offsetHeight,o=t.offsetWidth,r=o>h?h/2:o/2;this.circleCenter=r;var n=h>o?(o-30)/2:(h-30)/2;n-=30,this.radius=n,e.translate(r,r);for(var d=this.levels;d>0;d--)for(var g=this.radius*(5*this.distance-(d-1)*this.distance)/(5*this.distance),c=0;c<this.index.length;c++){e.beginPath(),e.globalAlpha=.4,e.rotate(this.rad*Math.PI/180),e.moveTo(0,0),e.lineTo(0,-g),1!=d?e.strokeStyle="rgba(0,0,0,0)":e.strokeStyle="black",e.stroke(),e.beginPath(),e.moveTo(0,-g);var v=g*Math.sin(this.rad*Math.PI/180),p=g*Math.cos(this.rad*Math.PI/180);e.strokeStyle="black",e.lineTo(v,0-p),e.stroke()}e.translate(-r,-r);for(var c=0;c<this.index.length;c++){var f=c*this.rad,v=r+Math.sin(f*Math.PI/180)*(this.radius+8),p=r-Math.cos(f*Math.PI/180)*(this.radius+8),y=r+Math.sin(f*Math.PI/180)*this.radius,u=r-Math.cos(f*Math.PI/180)*this.radius;l.push({x:y,y:u}),0==f||f>84&&96>f?e.textAlign="center":180>f?e.textAlign="left":e.textAlign="right",e.fillStyle="black",e.fillText(this.index[c],v,p)}for(var d=0;d<this.data.length;d++){e.beginPath();for(var c=0;c<this.index.length;c++){var b=this.data[d].value[c]*this.radius/(5*this.distance),f=c*this.rad,v=r+Math.sin(f*Math.PI/180)*b,p=r-Math.cos(f*Math.PI/180)*b;0==c?e.moveTo(v,p):e.lineTo(v,p)}e.closePath(),e.fillStyle=this.color[d],e.fill()}for(var x=-1,m=l.map(function(t){return x++,Math.pow(s.x-t.x,2)+Math.pow(s.y-t.y,2)}),P=Math.min.apply(null,m),c=0;c<this.index.length;c++)if(m[c]==P){x=c;break}for(var c=0;c<this.data.length;c++){var b=this.data[c].value[x]*this.radius/(5*this.distance),f=x*this.rad,v=r+Math.sin(f*Math.PI/180)*b,p=r-Math.cos(f*Math.PI/180)*b;e.beginPath(),e.arc(v,p,5,0,2*Math.PI),e.globalAlpha=.7,e.fillStyle=this.color[c],e.fill()}i.style.display="block",i.style.position="absolute",i.style.left=a.clientX+20+"px",i.style.top=a.clientY+20+"px";for(var k=this.message.replace(/{{index}}/,this.index[x]),c=0;c<this.data.length;c++)k=k.replace(/{{name}}/,this.data[c].name).replace(/{{value}}/,this.data[c].value[x]);i.innerHTML=k}.bind(this)),t.addEventListener("mouseout",function(){var t=this.context,e=t.canvas,a=e.offsetHeight,s=e.offsetWidth,l=s>a?a/2:s/2;this.circleCenter=l;var h=a>s?(s-30)/2:(a-30)/2;h-=30,this.radius=h,t.clearRect(0,0,9999,9999),t.translate(l,l);for(var o=this.levels;o>0;o--)for(var r=this.radius*(5*this.distance-(o-1)*this.distance)/(5*this.distance),n=0;n<this.index.length;n++){t.beginPath(),t.globalAlpha=.4,t.rotate(this.rad*Math.PI/180),t.moveTo(0,0),t.lineTo(0,-r),1!=o?t.strokeStyle="rgba(0,0,0,0)":t.strokeStyle="black",t.stroke(),t.beginPath(),t.moveTo(0,-r);var d=r*Math.sin(this.rad*Math.PI/180),g=r*Math.cos(this.rad*Math.PI/180);t.strokeStyle="black",t.lineTo(d,0-g),t.stroke()}t.translate(-l,-l);for(var n=0;n<this.index.length;n++){var c=n*this.rad,d=l+Math.sin(c*Math.PI/180)*(this.radius+8),g=l-Math.cos(c*Math.PI/180)*(this.radius+8);0==c||c>84&&96>c?t.textAlign="center":180>c?t.textAlign="left":t.textAlign="right",t.fillStyle="black",t.fillText(this.index[n],d,g)}for(var o=0;o<this.data.length;o++){t.beginPath();for(var n=0;n<this.index.length;n++){var v=this.data[o].value[n]*this.radius/(5*this.distance),c=n*this.rad,d=l+Math.sin(c*Math.PI/180)*v,g=l-Math.cos(c*Math.PI/180)*v;0==n?t.moveTo(d,g):t.lineTo(d,g)}t.closePath(),t.fillStyle=this.color[o],t.fill()}i.style.display="none"}.bind(this))},Radar.prototype.configMessage=function(t){for(var e=this.message,i=0;i<this.data.length-1;i++)this.message=this.message+"<br/>"+e;this.message="{{index}}<br/>"+this.message},Bar.prototype=inherit(Element.prototype),Bar.constructor=Bar,Bar.prototype.addEvent=function(t,e){var i=document.createElement("div");i.style.padding="10px",i.style.color="white",i.style.backgroundColor="rgba(0,0,0,0.45)",i.style.display="none",document.body.appendChild(i),t.addEventListener("mousemove",function(a){var s=getEventPosition(a);e.clearRect(0,0,9999,9999);var l=t.offsetHeight,h=t.offsetWidth;e.strokeStyle="black",e.globalAlpha=.6,e.lineWidth=2,e.beginPath(),e.moveTo(60,10),e.lineTo(60,l-60),e.lineTo(h-10,l-60),e.stroke();for(var o=(l-60-10)/6,r=(h-10-60)/this.xAxis.length,n=0;n<this.xAxis.length;n++){if(e.globalAlpha=.3,e.beginPath(),e.moveTo(60+n*r,l-60),e.lineTo(60+n*r,10),e.lineTo(60+(n+1)*r,10),e.lineTo(60+(n+1)*r,l-60),e.closePath(),e.isPointInPath(s.x,s.y)){var d=n;e.moveTo(60+d*r,l-60),e.lineTo(60+d*r,10),e.lineTo(60+(d+1)*r,10),e.lineTo(60+(d+1)*r,l-60),e.closePath(),e.fillStyle="black",e.fill(),i.style.display="block",i.style.position="absolute",i.style.left=a.clientX+20+"px",i.style.top=a.clientY+20+"px";for(var g=this.message.replace(/{{xAxis}}/,this.xAxis[d]),c=0;c<this.data.length;c++)g=g.replace(/{{value}}/,this.data[c].value[d]);i.innerHTML=g;break}i.style.display="none",e.fillStyle="rgba(3,3,3,0)",e.fill()}for(var n=0;6>=n;n++){e.globalAlpha=1,e.beginPath(),e.lineWidth=.5,e.moveTo(55,10+n*o),e.textAlign="right";var v=this.distance*(6-n);e.fillStyle="black",e.fillText(v+this.yAxis,55,15+n*o),e.lineTo(60,10+n*o),e.strokeStyle="black",e.stroke(),e.globalAlpha=.2,e.lineTo(h-10,10+n*o),e.strokeStyle="black",e.stroke()}e.strokeStyle="black";for(var n=0;n<this.xAxis.length;n++){e.globalAlpha=1,e.beginPath(),e.strokeStyle="black",e.lineWidth=.5,e.moveTo(60+(n+1)*r,l-55),e.textAlign="center";var v=this.xAxis[n];e.fillText(v,60+(n+1)*r-r/2,l-40),e.lineTo(60+(n+1)*r,l-60),e.stroke(),e.globalAlpha=.2,e.lineTo(60+(n+1)*r,10),e.stroke()}e.globalAlpha=.4;var p=(r-16)/this.group.length,f=0;for(var y in this.group){f++;for(var u=this.group[y].length/this.xAxis.length,b=this.xAxis.length,d=0;b>d;d++){e.strokeStyle=this.color[0];for(var x=l-60,n=0;u>n;n++){e.beginPath(),e.lineWidth=1,e.moveTo(68+d*r+p*(f-1),x),e.lineTo(68+d*r+p*f,x);var m=(l-70)/(6*this.distance),P=this.group[y][d+6*n]*m;e.lineTo(68+d*r+p*f,x-P),e.lineTo(68+d*r+p*(f-1),x-P),x-=P,e.closePath(),e.stroke(),e.fillStyle=this.color[n],e.fill()}}}}.bind(this))},Bar.prototype.draw=function(){var t=this.context,e=t.canvas,i=e.offsetHeight,a=e.offsetWidth;t.strokeStyle="black",t.globalAlpha=.6,t.lineWidth=2,t.beginPath(),t.moveTo(60,10),t.lineTo(60,i-60),t.lineTo(a-10,i-60),t.stroke();for(var s=(i-60-10)/6,l=0;6>=l;l++){t.globalAlpha=1,t.beginPath(),t.lineWidth=.5,t.moveTo(55,10+l*s),t.textAlign="right";var h=this.distance*(6-l);t.fillText(h+this.yAxis,55,15+l*s),t.lineTo(60,10+l*s),t.stroke(),t.globalAlpha=.2,t.lineTo(a-10,10+l*s),t.stroke()}s=(a-10-60)/this.xAxis.length;for(var l=0;l<this.xAxis.length;l++){t.globalAlpha=1,t.beginPath(),t.lineWidth=.5,t.moveTo(60+(l+1)*s,i-55),t.textAlign="center";var h=this.xAxis[l];t.fillText(h,60+(l+1)*s-s/2,i-40),t.lineTo(60+(l+1)*s,i-60),t.stroke(),t.globalAlpha=.2,t.lineTo(60+(l+1)*s,10),t.stroke()}t.globalAlpha=.4;var o=(s-16)/this.group.length,r=0;for(var n in this.group){r++;for(var d=this.group[n].length/this.xAxis.length,g=this.xAxis.length,c=0;g>c;c++){t.strokeStyle=this.color[0];for(var v=i-60,l=0;d>l;l++){t.beginPath(),t.lineWidth=1,t.moveTo(68+c*s+o*(r-1),v),t.lineTo(68+c*s+o*r,v);var p=(i-70)/(6*this.distance),f=this.group[n][c+6*l]*p;t.lineTo(68+c*s+o*r,v-f),t.lineTo(68+c*s+o*(r-1),v-f),v-=f,t.closePath(),t.stroke(),t.fillStyle=this.color[l],t.fill()}}}return this.addEvent(e,t),this},Bar.prototype.configMessage=function(t){var e=this.message,i=0,a=[];this.data=this.data.sort(sortBy("type"));for(var s=0;s<this.data.length-1;s++)this.data[s+1].type==this.data[s].type?this.message=this.message+"<br/>"+e:(a[i++]=this.data[s].type,this.message=this.message+"<br/>{{type}}<br/>"+e);a[i++]=this.data[this.data.length-1].type;for(var s=0;s<this.data.length;s++)this.message=this.message.replace(/{{name}}/,this.data[s].name);this.message="{{xAxis}}<br/>{{type}}<br/>"+this.message;for(var s=0;i>s;s++)this.message=this.message.replace(/{{type}}/,a[s]);console.log(a)},Line.prototype=inherit(Element.prototype),Line.constructor=Line,Line.prototype.draw=function(){var t=this.context,e=t.canvas,i=e.offsetHeight,a=e.offsetWidth;t.strokeStyle="black",t.globalAlpha=.6,t.lineWidth=2,t.beginPath(),t.moveTo(60,10),t.lineTo(60,i-60),t.lineTo(a-10,i-60),t.stroke();for(var s=(i-60-10)/6,l=0;6>=l;l++){t.globalAlpha=1,t.beginPath(),t.lineWidth=.5,t.moveTo(55,10+l*s),t.textAlign="right";var h=this.distance*(6-l);t.fillText(h+this.yAxis,55,15+l*s),t.lineTo(60,10+l*s),t.stroke(),t.globalAlpha=.2,t.lineTo(a-10,10+l*s),t.stroke()}s=(a-10-60)/this.xAxis.length;for(var l=0;l<this.xAxis.length;l++){t.globalAlpha=1,t.beginPath(),t.lineWidth=.5,t.moveTo(60+(l+1)*s,i-55),t.textAlign="center";var h=this.xAxis[l];t.fillText(h,60+(l+1)*s,i-40),t.lineTo(60+(l+1)*s,i-60),t.stroke(),t.globalAlpha=.2,t.lineTo(60+(l+1)*s,10),t.stroke()}t.globalAlpha=.75;for(var l=0;l<this.data.length;l++)if(this.data[l].curve)for(var o=0;o<this.data[l].value.length;o++){t.beginPath();var r=(i-70)*this.data[l].value[o]/this.max;r=i-60-r;var n=(i-70)*this.data[l].value[o+1]/this.max;n=i-60-n,t.moveTo(60+(o+1)*s,r),t.bezierCurveTo(60+(o+1)*s+16,r,60+(o+2)*s-16,n,60+(o+2)*s,n),t.strokeStyle=this.color[l],t.stroke(),t.beginPath(),t.arc(60+(o+1)*s,r,3,0,2*Math.PI),t.stroke()}else for(var o=0;o<this.data[l].value.length;o++){t.beginPath();var r=(i-70)*this.data[l].value[o]/this.max;r=i-60-r;var n=(i-70)*this.data[l].value[o+1]/this.max;n=i-60-n,t.moveTo(60+(o+1)*s,r),t.lineTo(60+(o+2)*s,n),t.strokeStyle=this.color[l],t.stroke(),t.beginPath(),t.arc(60+(o+1)*s,r,3,0,2*Math.PI),t.stroke()}this.addEvent(e,t)},Line.prototype.addEvent=function(t,e){var i=document.createElement("div");i.style.padding="10px",i.style.color="white",i.style.backgroundColor="rgba(0,0,0,0.45)",i.style.display="none",document.body.appendChild(i),t.addEventListener("mousemove",function(t){var e=getEventPosition(t),a=this.context,s=a.canvas,l=s.offsetHeight,h=s.offsetWidth;a.clearRect(0,0,99999,99999),a.strokeStyle="black",a.globalAlpha=.6,a.lineWidth=2,a.beginPath(),a.moveTo(60,10),a.lineTo(60,l-60),a.lineTo(h-10,l-60),a.stroke();for(var o=(l-60-10)/6,r=0;6>=r;r++){a.globalAlpha=1,a.beginPath(),a.lineWidth=.5,a.moveTo(55,10+r*o),a.textAlign="right";var n=this.distance*(6-r);a.fillText(n+this.yAxis,55,15+r*o),a.lineTo(60,10+r*o),a.stroke(),a.globalAlpha=.2,a.lineTo(h-10,10+r*o),a.stroke()}o=(h-10-60)/this.xAxis.length;for(var r=0;r<this.xAxis.length;r++){a.globalAlpha=1,a.beginPath(),a.lineWidth=.5,a.moveTo(60+(r+1)*o,l-55),a.textAlign="center";var n=this.xAxis[r];a.fillText(n,60+(r+1)*o,l-40),a.lineTo(60+(r+1)*o,l-60),a.stroke(),a.globalAlpha=.2,a.lineTo(60+(r+1)*o,10),a.stroke()}a.globalAlpha=.75;for(var r=0;r<this.data.length;r++)if(this.data[r].curve)for(var d=0;d<this.data[r].value.length;d++){var g;e.x>60+d*o&&e.x<60+(d+1)*o&&(g=d),e.x>60&&(a.beginPath(),a.moveTo(60+(g+1)*o,l-60),a.lineTo(60+(g+1)*o,10),a.strokeStyle="black",a.stroke()),a.beginPath();var c=(l-70)*this.data[r].value[d]/this.max;c=l-60-c;var v=(l-70)*this.data[r].value[d+1]/this.max;v=l-60-v,a.moveTo(60+(d+1)*o,c),a.bezierCurveTo(60+(d+1)*o+16,c,60+(d+2)*o-16,v,60+(d+2)*o,v),a.strokeStyle=this.color[r],a.stroke(),a.beginPath(),a.arc(60+(d+1)*o,c,3,0,2*Math.PI),a.stroke()}else for(var d=0;d<this.data[r].value.length;d++){a.beginPath();var c=(l-70)*this.data[r].value[d]/this.max;c=l-60-c;var v=(l-70)*this.data[r].value[d+1]/this.max;v=l-60-v,a.moveTo(60+(d+1)*o,c),a.lineTo(60+(d+2)*o,v),a.strokeStyle=this.color[r],a.stroke(),a.beginPath(),a.arc(60+(d+1)*o,c,3,0,2*Math.PI),a.stroke()}i.style.display="block",i.style.position="absolute",i.style.left=t.clientX+20+"px",i.style.top=t.clientY+20+"px";for(var p=this.message,r=0;r<this.data.length;r++)p=p.replace(/{{value}}/,this.data[r].value[g]);i.innerHTML=p}.bind(this))},Line.prototype.configMessage=function(t){for(var e=this.message,i=0;i<this.data.length-1;i++)this.message=this.message+"<br/>"+e;for(var i=0;i<this.data.length;i++)this.message=this.message.replace(/{{name}}/,this.data[i].name)};