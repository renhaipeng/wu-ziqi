$(function(){

var w=600;
var row=15;
var block=w/row;
var ctx=$('#canvas').get(0).getContext('2d');
var draw=function(){
	$('#canvas').get(0).width=$('#canvas').get(0).height=w;
	var jiange=block/2+0.5;
	var lineWidth=w-block;

//   var img=new Image();
// img.src='img/pan.jpg';
// window.onload=function(){
// 	  var ptrn = ctx.createPattern(img,'no-repeat');
//     ctx.fillStyle = ptrn;
//     ctx.fillRect(0,0,w,w);
// }

    // 横线
	 ctx.save();
    ctx.beginPath();
    for(var i=0;i<row;i++){
    if(i===0){
       ctx.translate(jiange,jiange);
      }else{
          ctx.translate(0,block);
     }
    ctx.moveTo(0,0);
    ctx.lineTo(lineWidth,0);
    }
    ctx.stroke();
    ctx.closePath();
    ctx.restore();

  //  // 竖线
   	ctx.save();
    ctx.beginPath();
    for(var i=0;i<row;i++){
    if(i===0){
       ctx.translate(jiange,jiange);
      }else{
        ctx.translate(block,0);
     }
    ctx.moveTo(0,0);
    ctx.lineTo(0,lineWidth);
    }
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
var radius=3;
// 四个点
var point=[3.5*block+0.5,11.5*block+0.5];
    
    for(var i=0;i<2;i++){
    	for(var j=0;j<2;j++){
    		var x=point[i];
    		var y=point[j];
    		  ctx.save();
            ctx.beginPath();
    		ctx.translate(x,y);
    		ctx.arc(0,0,radius,0,(Math.PI/180)*360);
            ctx.fill();
             ctx.closePath();
           ctx.restore();
    	}
    }
  
// 中心点
   ctx.save();
ctx.translate(7.5*block+0.5,7.5*block+0.5);
ctx.beginPath();
ctx.arc(0,0,3,0,(Math.PI/180)*360);
ctx.fill();
ctx.closePath();
ctx.restore();
}
draw();


// 放旗子

var qiziRadius=block/2*0.8;
 var drop=function(qizi){
   ctx.save();
   ctx.translate((qizi.x+0.5)*block,(qizi.y+0.5)*block);
   ctx.beginPath();
   ctx.arc(0,0,qiziRadius,0,(Math.PI/180)*360);
   if(qizi.color===1){
   	ctx.fillStyle='black';
   } else{
   	var jianbian=ctx.createRadialGradient(0,0,15,0,-4,10);
    jianbian.addColorStop(0,'#666');
    jianbian.addColorStop(0.5,'#ccc');
    jianbian.addColorStop(1,'#fff');
    ctx.fillStyle=jianbian;
   }
   ctx.fill();
   ctx.closePath();
   ctx.restore();
 }
// drop({x:2,y:5,color:0});

var flag=true;
var zi={};

 var panduan=function(qizi){
  var shuju={};
  $.each(zi,function(k,v){
  	if(v.color===qizi.color){
  		shuju[k]=v;
  	}
  })

var hang=1,lie=1,youxie=1,zuoxie=1;
var tx,ty;
tx=qizi.x,ty=qizi.y;
// 列
while(shuju[tx+'-'+(ty-1)]){
	lie++;ty--;
}
tx=qizi.x,ty=qizi.y;
while(shuju[tx+'-'+(ty+1)]){
	lie++;ty++;
}
// hang
while(shuju[(tx-1)+'-'+ty]){
	hang++;tx--;
}
tx=qizi.x,ty=qizi.y;
while(shuju[(tx+1)+'-'+ty]){
	hang++;tx++;
}
// zuoxie
while(shuju[(tx-1)+'-'+(ty-1)]){
	zuoxie++;tx--;ty--;
}
tx=qizi.x,ty=qizi.y;
while(shuju[(tx+1)+'-'+(ty+1)]){
	zuoxie++;tx++;ty++;
}
// youxie
while(shuju[(tx-1)+'-'+(ty+1)]){
	youxie++;tx--;ty++;
}
tx=qizi.x,ty=qizi.y;
while(shuju[(tx+1)+'-'+(ty-1)]){
	youxie++;tx++;ty--;
}

if(lie>=5||hang>=5||zuoxie>=5||youxie>=5){
	return true;
}

}
// 点击放旗子


var step=1;
$('#canvas').on('click',function(e){
  var x=Math.floor(e.offsetX/block);
  var y=Math.floor(e.offsetY/block);
  if(zi[x+'-'+y]){
  	return;
  }
  if(flag){
  	var qizi={x:x,y:y,color:1,step:step};
  	drop(qizi);
  	flag=false;
  	if( panduan(qizi) ){
      $('.cartel').show().find('#tishi').text('黑棋赢');
      // ctx.save();
      // ctx.beginPath();
      // ctx.font='48px Arial';
      // ctx.fillText('黑棋获胜',300,300);
      // ctx.closePath();
      // ctx.restore();
  		$('.cartel').show();
  	};
  }else{
  	var qizi={x:x,y:y,color:0,step:step};
  	drop(qizi)
  	flag=true;
  	if(panduan(qizi)){
  	    $('.cartel').show().find('#tishi').text('白棋赢');
        $('.cartel').show();
  	};
  }
  step+=1;
  zi[x+'-'+y]=qizi;
})

$('.cartel').on('click',function(){
   $(this).hide();
})
$('#del').on('click',function(){
  $('.cartel').hide();
})
$('.tips').on('click',false);

$('#restart').on('click',function(){
  $('.cartel').hide();
  ctx.clearRect(0,0,600,600);
  draw();
  step=1;
  flag=true;
  zi={};

})

$('#qipu').on('click',function(){
  $('.cartel').hide();
  $('#save').show();
  ctx.save();
  ctx.beginPath();
  ctx.font='18px Arial';
  for(var i in zi){
    if(zi[i].color===1){
      ctx.fillStyle='#fff';
    }else{
      ctx.fillStyle='black';
    }
    ctx.textAlign='center';
  ctx.tetxBaseline='middle';
  ctx.fillText(zi[i].step,(zi[i].x+0.5)*block,(zi[i].y+0.5)*block);
  }
  
  ctx.closePath();
  ctx.restore();
  var image=$('#canvas').get(0).toDataURL('image/png',1);
  $('#save').attr('href',image);
  $('#save').attr('download','qipu.png');
})

});