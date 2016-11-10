let linkClicked = false;

$(".mdl-layout__header--search-results a").click(() => {
  linkClicked = true;
});

$(".mdl-layout__header .mdl-layout__header-input .mdl-textfield__input")
.blur(function() {
  setTimeout( () => {
    console.log( linkClicked );
    linkClicked = false;
    $(this).parents(".mdl-layout__header-input").removeClass("links-visible");
  }, 100);
})
.focus(function() {
  $(this).parents(".mdl-layout__header-input").addClass("links-visible");
});

// $(".mdl-layout__content").scroll(function(){
//   const id = $(".section:in-viewport").first().attr("id");
//   const $a = $(`.mdl-navigation__ul a[href="#${id}"]`);
//   console.log(id);
//   $(".mdl-navigation__ul a").removeClass("current");
//   $a.addClass("current");
// });
