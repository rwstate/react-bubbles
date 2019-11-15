import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { isPropertySignature } from "typescript";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ update, setUpdate, colors, updateColors}) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => setUpdate(!update))
      .catch(err => console.log(err));
    setEditing(false);

  };

  const deleteColor = color => {
    // make a delete request to delete this color
    // e.preventDefault();
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(res => setUpdate(!update))
      .catch(err => console.log(err));
  };

  const addColor = e => {
    e.preventDefault();
    axiosWithAuth()
      .post(`http://localhost:5000/api/colors/`, newColor)
      .then(res => setUpdate(!update))
      .catch(err => console.log(err));
  }

  const randomColor = e => {
    return '#'+(Math.random()*(1<<24)|0).toString(16);
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
            <button onClick={() => setColorToEdit({
                  ...colorToEdit,
                  code: { hex: randomColor() }
                })} >
            Randomize Color
            </button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <div>
        <form onSubmit={addColor}>
          <input
            type="text"
            value={newColor.color}
            onChange={e =>
              setNewColor({ ...newColor, color: e.target.value })
            }
          />
          <input
            type="text"
            value={newColor.code.hex}
            onChange={e =>
              setNewColor({
                ...newColor,
                code: { hex: e.target.value }
              })
            }
          />
          <button type="submit">Add Color</button>        
        </form>
        <button onClick={() => setNewColor({
                ...newColor,
                code: { hex: randomColor() }
              })}>
          Random Color
        </button>
      </div>
    </div>
  );
};

export default ColorList;
