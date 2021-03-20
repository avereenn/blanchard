`use strict`;

const selectElems = document.querySelectorAll(`.js-select`);

selectElems.forEach((select) => {
  new Choices(select, {
    searchEnabled: false,
    itemSelectText: ``,
    shouldSort: false,
  });
});
