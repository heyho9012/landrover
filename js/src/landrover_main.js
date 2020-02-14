(function($){

    const win = $(window),
          wrap=$('#wrap'),
          headBox=wrap.find('#headBox'),
          viewBox=wrap.find('#viewBox'),
          footBox=wrap.find('#footBox');
  
    footBox.load("./footer.html");
    headBox.load("./header.html",function(){
  
      const headBtn=headBox.find('.menu_icon'),
            menuPage=headBox.find('.menu_page'),
            searchI=headBox.find('.sI'),
            searchLink=searchI.find('a'),
            searchLabel=searchI.find('label'),
            searchIcon=searchI.find('input'),
            downArrow=viewBox.find('.down_arrow'),
            daLink=downArrow.find('a');
  
      headBtn.on('click',function(e){
          e.preventDefault();
          e.stopPropagation();
          headBtn.toggleClass('click');
          menuPage.fadeToggle(500);
      });
      searchLabel.on('click',function(){
          searchIcon.fadeToggle();
          searchLink.fadeToggle();
      });
      menuPage.on('scroll touchmove mousewheel',function(e){
          e.preventDefault();
          e.stopPropagation();
          return false;
      });
      
      daLink.click(function(){
          $('html, body').animate({scrollTop: $( $.attr(this, 'href') ).offset().top}, 1000);
          return false;
      });
    });//headBox.load

    const familyBox=wrap.find('#familyBox'),
          familyI=familyBox.find('.family_i'),
          fmailyImg1=familyI.find('.f_img_01'),
          fmailyImg2=familyI.find('.f_img_02'),
          fmailyImg3=familyI.find('.f_img_03'),
          viewUl=viewBox.find('.view_slide'),
          exploreBox=wrap.find('#exploreBox'),
          exploreBtn=exploreBox.find('button'),
          exploreUl=exploreBox.find('.explore_slide');
         

        
    let exploreLi=exploreUl.children('li'),
        viewLi=viewUl.find('li');
    let exploreLen=exploreLi.length;

    let winH=win.outerHeight();          
    let headBoxH=headBox.outerHeight();
    let familyOffset1=fmailyImg1.offset().top;
    let familyOffset2=fmailyImg2.offset().top;
    let familyOffset3=fmailyImg3.offset().top;
    let family_offset1=familyOffset1-(winH);
    let family_offset2=familyOffset2-(winH);
    let family_offset3=familyOffset3-(winH);

// --------------------------------------------------------------

    win.on('scroll', function(){
        let winScroll = win.scrollTop();
        // ---------------------------------
        if(winScroll>headBoxH){
            headBox.addClass('action'); 
        }else{
            headBox.removeClass('action');
        }
        // ---------------------------------
        if(winScroll>family_offset1){
            fmailyImg1.addClass('action');              
            fmailyImg1.addClass('action');
        }else{
           fmailyImg1.removeClass('action');
           fmailyImg1.removeClass('action');
        }
        if(winScroll>family_offset2){
            fmailyImg2.addClass('action');              
            fmailyImg2.addClass('action');
        }else{
           fmailyImg2.removeClass('action');
           fmailyImg2.removeClass('action');
        }
        if(winScroll>family_offset3){
            fmailyImg3.addClass('action');              
            fmailyImg3.addClass('action');
        }else{
           fmailyImg3.removeClass('action');
           fmailyImg3.removeClass('action');
        }
    });//#familyBox scroll

// --------------------------------------------------------------

    const viewBtnArea=viewBox.find('.view_btn_area'),
          indiUl=viewBtnArea.find('.indicator'),
          indiLi=indiUl.find('li');

    viewLi.eq(-1).clone(true).prependTo(viewUl);
    viewLi=viewUl.find('li');
    viewUl.css({width:100 * viewLi.length + '%', marginLeft:-100+'%'});
    viewLi.css({width:100 / viewLi.length + '%'});

    const viewText=viewBox.find('.view_text');
    let go,j=0;
    const slideGo = function(){
        go=setInterval(function(){
            j++;
            if(j>=4){
                j=0;
                viewUl.css({left:100+'%'});
            }
            viewUl.animate({left:-100 * j+'%'},2000, function(){
            });
            indiLi.eq(j).addClass('action',1000);
            indiLi.eq(j).siblings().removeClass('action'); 
        },4500);
    };
    slideGo();
    const slideStop = function(){clearInterval(go);};      
    viewBox.on('mouseenter' ,function(){slideStop();});
    viewBox.on('mouseleave', function(){slideGo();});

    indiLi.eq(0).addClass('action');
    indiLi.children('a').on('click',function(e){
        e.preventDefault();
        j=$(this).parent('li').index();
        viewUl.animate({left:-100 * j +'%'});
        indiLi.eq(j).siblings().removeClass('action'); 
        indiLi.eq(j).addClass('action');
    });//#viewBox indicator
  
// -------------------------------------------------------------- 

    const exBtnArea=exploreBox.find('.ex_btn_area'),
          indiUl2=exBtnArea.find('.indicator'),
          indiLi2=indiUl2.find('li');
    // ------------------------------------------------
    exploreUl.css({marginLeft:'-100%'});
    exploreUl.children('li').eq(-1).clone().prependTo(exploreUl);
    exploreLen++;

    let i=0;
    exploreBtn.on('click', function(e){
        e.preventDefault();
        // console.log( $(this) );
        let $has=$(this).hasClass('next');  
        if($has){
          i++;
          if(i>=exploreLen-1){i=0; 
            exploreUl.css({left:'100%'});
          }    
        }else{i--;}    
        exploreUl.stop().animate({left:-100*i+'%'}, function(){
          if(i<=-1){
            i=exploreLen-2; 
            exploreUl.css({left:-100*i+'%'});
          }  
        });
        indiLi2.eq(i).addClass('action');
        indiLi2.eq(i).siblings().removeClass('action');
      }); // #exploreBox button
      // ------------------------------------------------
      indiLi2.eq(0).addClass('action');
      indiLi2.children('a').on('click focus',function(e){
          e.preventDefault();
          i = $(this).parent().index();
          exploreUl.animate({left:-100* i +'%'});
          indiLi2.eq(i).addClass('action');
          indiLi2.eq(i).siblings().removeClass('action');
      });//#exploreBox indicator
      
// -----------------------------------------------------------------

    const productBox=wrap.find('#productBox'),
          productArea=productBox.find('.product_area'),
          productBtn=productBox.find('button'),
          productNext=productArea.find('.next'),
          productPrev=productArea.find('.prev'),
          productUl=productArea.find('ul'),
          productLi=productUl.find('li'),
          productLiLink=productLi.find('a'),
          productImg=productLiLink.children('div'),
          productBar=productBox.find('.bar').children('div');

    // -----------------------------------------------------------

    let t=0;
    productUl.find('li').eq(3).addClass('action');
    productBtn.on('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        let $has=$(this).hasClass('next');  
        productBtn.attr("disabled",true);
        setTimeout(function(){productBtn.removeAttr("disabled");},500);    
       if($has){
        t++;
        if(t>=5){
            productBar.css({left:-37.5+'%'})
            t=-3;
        }
        productBar.stop().animate({left:12.5*t+'%'});
        productUl.stop().animate({left:-100+'%'},function(){
            productUl.children('li').eq(0).appendTo(productUl);
            productUl.css({left:0});
        });
        productUl.find('li').eq(4).addClass('action');
        productUl.find('li').eq(4).siblings().removeClass('action');
       }else{
        t--;
        if(t<=-4){
            productBar.css({left:50+'%'});
            t=4;
        }
        productBar.stop().animate({left:12.5*t+'%'});
        productUl.stop().animate({left:100+'%'}, function(){
            productUl.children('li').eq(-1).prependTo(productUl);
            productUl.css({left:0});
        });
        productUl.find('li').eq(2).addClass('action');
        productUl.find('li').eq(2).siblings().removeClass('action');
       }
       
      }); // #exploreBox button
    

// -----------------------------------------------------------------

    const dsMlBox=wrap.find('#dsMlBox');
    const myL=dsMlBox.find('.myL');
    const myLul=myL.find('ul');
    const myLli=myLul.find('li');
    const myLlink=myLli.children('a');
    
    myLlink.on('mouseenter',function(e){
        e.preventDefault();
        let selectLi=$(this).parents('ul').children('li').eq(0);
        selectLi.children('h3').stop().animate({color:'#f89626',borderColor:'#f89626'},300);
        
    }).on('mouseleave',function(e){
        e.preventDefault();
        myLli.children('h3').stop().animate({color:'#fff',borderColor:'#fff'},300);
    });
// -----------------------------------------------------------------

})(jQuery);