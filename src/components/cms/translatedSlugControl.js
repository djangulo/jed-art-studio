import React from "react";

class TranslatedSlugControl extends React.Component {
  render() {
    const {
      forID,
      value,
      onChange,
      classNameWrapper,
      setActiveStyle,
      setInactiveStyle
    } = this.props;
    return (
      <input
        type='text'
        id={forID}
        className={classNameWrapper}
        value={value || ""}
        onChange={e => onChange(e.target.value.replace(/^.*\/\/[^/]+/, ""))}
        onFocus={setActiveStyle}
        onBlur={setInactiveStyle}
      />
    );
  }
}

export default TranslatedSlugControl;
