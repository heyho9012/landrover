(function($){

    const win = $(window),
    wrap=$('#wrap'),
    headBox=wrap.find('#headBox'),
    viewBox=wrap.find('#viewBox'),
    footBox=wrap.find('#footBox');
  
    footBox.load("./footer.html");
    headBox.load("./header.html",function(){
  
      const headBtn=headBox.find('.menu_icon');
      const menuPage=headBox.find('.menu_page');
      const searchI=headBox.find('.sI');
      const searchLink=searchI.find('a');
      const searchLabel=searchI.find('label');
      const searchIcon=searchI.find('input');
      const downArrow=viewBox.find('.down_arrow');
      const daLink=downArrow.find('a');
  
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
  
      win.on('scroll', function(){
        let headBoxH=headBox.outerHeight();
        let winScroll = win.scrollTop();
        // ---------------------------------
        if(winScroll>headBoxH){
            headBox.addClass('action'); 
        }else{
            headBox.removeClass('action');
        }
      });
    });//headBox.load
  
    // -----------------------------------------------------------------
  
    const viewUl=viewBox.find('.view_slide');
    let viewLi=viewUl.find('li');
    
    const viewBtnArea=viewBox.find('.view_btn_area'),
          indiUl=viewBtnArea.find('.indicator'),
          indiLi=indiUl.find('li');
  
    
  
      viewLi.eq(-1).clone(true).prependTo(viewUl);
      viewLi=viewUl.find('li');
      viewUl.css({width:100 * viewLi.length + '%', marginLeft:-100+'%'});
      viewLi.css({width:100 / viewLi.length + '%'});
  
      let go,j=0;
      const slideGo = function(){
          go=setInterval(function(){
              j++;
              if(j>=3){
                  j=0;
                  viewUl.css({left:100+'%'});
              }
              viewUl.animate({left:-100 * j+'%'},1200, function(){
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
    // ---------------------------------------------------------------------------------
  
  })(jQuery);