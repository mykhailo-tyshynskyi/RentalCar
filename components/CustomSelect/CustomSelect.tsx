"use client";
import css from "./CustomSelect.module.css";
import Select, { components, type DropdownIndicatorProps } from "react-select";
import type { ClassNamesConfig } from "react-select";

import Icon from "../Icon/Icon";

interface Option {
  value: string;
}

interface CustomSelectProps {
  options: string[];
  name: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  formatSelectedValue?: (value: string) => string;
}

const selectClassNames: ClassNamesConfig<Option, false> = {
  control: () => css.control,
  valueContainer: () => css.valueContainer,
  placeholder: () => css.placeholder,
  singleValue: () => css.singleValue,
  menu: () => css.menu,
  menuList: () => css.menuList,
  option: (state) =>
    [
      css.option,
      state.isSelected && css.selected,
      state.isFocused && css.focused,
    ]
      .filter(Boolean)
      .join(" "),
  dropdownIndicator: () => css.dropdownIndicator,
};

export default function CustomSelect({
  options,
  name,
  placeholder,
  value,
  onChange,
  formatSelectedValue,
}: CustomSelectProps) {
  const selectOptions: Option[] = options.map((item) => ({
    value: item,
  }));

  const DropdownIndicator = (props: DropdownIndicatorProps<Option, false>) => (
    <components.DropdownIndicator {...props}>
      <Icon
        id={props.selectProps.menuIsOpen ? "icon-up" : "icon-down"}
        width={16}
        height={16}
      />
    </components.DropdownIndicator>
  );

  return (
    <>
      <Select<Option, false>
        instanceId={name}
        classNames={selectClassNames}
        inputId={name}
        options={selectOptions}
        value={selectOptions.find((option) => option.value === value) ?? null}
        onChange={(option) => onChange(option?.value ?? "")}
        getOptionLabel={(option) => option.value}
        getOptionValue={(option) => option.value}
        placeholder={placeholder}
        isSearchable={false}
        components={{
          DropdownIndicator,
          IndicatorSeparator: null,
        }}
        formatOptionLabel={(option, { context }) => {
          if (context === "value" && formatSelectedValue) {
            return formatSelectedValue(option.value);
          }

          return option.value;
        }}
      />

      <input type="hidden" name={name} value={value} />
    </>
  );
}
