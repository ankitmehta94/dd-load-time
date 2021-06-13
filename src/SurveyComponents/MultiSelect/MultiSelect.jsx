import { useEffect, useState } from "react";
import "./MultiSelect.css";
import debounce from "../../Utils/Debounce";

const MultiSelect = ({ defaultValue = [], optionArray, placeholder, setValue, label, isInvalid }) => {
  const [itemList, setitemList] = useState(defaultValue);
  const [open, setopen] = useState(false);
  const [optionList, setoptionList] = useState(optionArray);

  function getOptionList(array) {
    return array.map((opt, i) => {
      let optClass = "optionDiv ";
      const present = itemList.includes(opt);
      if (present) {
        optClass += "optDisabled";
      }
      return (
        <div  className={optClass} onClick={() => addItem(opt)}>
          {opt}
        </div>
      );
    });
  }
  function getItemList(array) {
    return array.map((item, i) => {
      return (
        <div
          key={`item-${i}`}
          className={"valuePill"}
        >
          {item}{" "}
          <span className={"removePill"} onClick={(e) => removeItem(e, item)}>
            X
          </span>
        </div>
      );
    });
  }
  function removeItem(e, item) {
    e.stopPropagation();
    const index = itemList.indexOf(item);
    itemList.splice(index, 1);
    const newArray = itemList.slice();
    setitemList(newArray);
    setValue(newArray)
  }
  function addItem(item) {
    if (!itemList.includes(item)) {
      itemList.push(item);
      const newArray = itemList.slice();
      setitemList(newArray);
      setValue(newArray)
    }
  }
  let optContainerClass = "optionsContainer ";
  if (open) {
    optContainerClass += "openOptContainer";
  }
  const onOptionSearch = debounce((str) => {
    const array = searchStringArray(optionArray, str);
    setoptionList(getOptionList(array));
  },300)
  const invalidText = isInvalid ? `Please Select ${label}` : null;
  const invalidClass = isInvalid?'invalidMultiSelect':''
  const pillContainerClass = 'valueList '+invalidClass;
  const pillList = getItemList(itemList);
  const optionDivList = open?getOptionList(optionList):null
  return (
    <div className={"multiSelectContainer"}>
    <label className={'lableStyle'}>{label}</label>
      <div className={pillContainerClass} onClick={() => setopen(!open)}>
        {pillList.length?pillList:(<span className={'placeholderStyle'}>{placeholder}</span>)}
      </div>
      <div className={optContainerClass}>
        <input type={"text"} className={'searchBarStyle'} onChange={(e) => onOptionSearch(e.target.value)} placeholder={'Search Options'} />
        <div className={'optList'}>
            {optionDivList}
        </div>
        <div ><button onClick={() => setopen(false)} className={'valuePill floatRight'}>Done</button></div>
      </div>
      <span className={'invalidText'}>{invalidText}</span>
    </div>
  );
};
const searchStringArray = (array, str) => {
  const newArray = [];
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if (element.toUpperCase().includes(str.toUpperCase())) {
      newArray.push(element);
    }
  }
  return newArray;
};



export default MultiSelect;
