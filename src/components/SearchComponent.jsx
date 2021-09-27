import React, { useState } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
const SearchComponent = (props) => {
  const {atributte,secondAttrib,nameField,reload, rows,setRows, nameElements} = props
  const [text,setText]=useState("")
  const filter = (text) => {
    if (text === "") {
      reload()
    }
    const elements = rows.filter(
          row => 
            secondAttrib!==undefined?
              row[atributte][secondAttrib].toLowerCase().includes(text.toLowerCase()):
              row[atributte].toLowerCase().includes(text.toLowerCase())
      )
      setRows(elements)
  }
  return (
    <TextField variant="outlined" label={`Buscar ${nameElements} por ${nameField}`} style={{ width: 400 }} size="small"
      value={text}
      onChange={(e) => {
        setText(e.target.value)
        filter(e.target.value)
      }}
      InputProps={{
        startAdornment: (
            <InputAdornment position="start">
                <SearchIcon/>
            </InputAdornment>
        ),
        endAdornment: (
          text&&<InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={()=>{setText("");filter("")}}
              edge="end"
            >
              <CancelIcon/>
            </IconButton>
          </InputAdornment>
      )
    }}
    />
  )
}

export default SearchComponent

