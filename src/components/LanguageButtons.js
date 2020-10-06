import React, { Component, useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'

export default function LanguageButtons(props) {
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState("en");
  
    const radios = [
      { name: 'English', value: "en" },
      { name: '中文', value: "zh" },
      { name: '日本語', value: "ja" },
      { name: '한국어', value: "ko" },
    ];
  
    return (
      <>
        <ButtonGroup toggle>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              type="radio"
              variant="secondary"
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => {setRadioValue(e.currentTarget.value); props.handleLangClick(e.currentTarget.value)}}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </>
    );
}