import { useEffect, useState } from "react";
import "./MultiSelect.css";

const MultiSelect = ({ defaultValue = [], optionArray, placeholder, setValue, label }) => {
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
  function onOptionSearch(str) {
    const array = searchStringArray(optionArray, str);
    setoptionList(getOptionList(array));
  }
  const pillList = getItemList(itemList);
  const optionDivList = getOptionList(optionList)
  return (
    <div className={"multiSelectContainer"}>
    <label className={'lableStyle'}>{label}</label>
      <div className={"valueList"} onClick={() => setopen(!open)}>
        {pillList.length?pillList:(<span className={'placeholderStyle'}>{placeholder}</span>)}
      </div>
      <div className={optContainerClass}>
        <input type={"text"} className={'searchBarStyle'} onChange={(e) => onOptionSearch(e.target.value)} placeholder={'Search Options'} />
        <div className={'optList'}>
            {optionDivList}
        </div>
        <div ><button onClick={() => setopen(false)} className={'valuePill floatRight'}>Done</button></div>
      </div>
    </div>
  );
};
const searchStringArray = (array, str) => {
  const newArray = [];
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if (element.includes(str)) {
      newArray.push(element);
    }
  }
  return newArray;
};
export default MultiSelect;
