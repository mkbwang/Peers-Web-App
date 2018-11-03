const { Component, Children, PropTypes } = React
const { Select, Option, utils } = Selectly
const { getToggledOptions } = utils

class CheckboxOption extends Component {
  render() {
    const { value, isChecked, children } = this.props
    return (
      <Option  value={value}>
        <input
          type="checkbox"
          defaultValue={null}
          checked={isChecked}
        />
        <div >
          {children}
        </div>
      </Option>
    )
  }
}

class gender extends Component {
  constructor(props) {
    super(props)
    this.state = {
      defaultValue: 'Select a color',
      currentValues: []
    }
    this._handleChange = this._handleChange.bind(this)
  }

  _handleChange(value) {
    this.setState({
      currentValues: getToggledOptions(this.state.currentValues, value)
    })
  }

  render() {
    const { defaultValue, currentValues } = this.state

    return (
      <Select
        classPrefix="react-select"
        multiple
        onChange={this._handleChange}
      >
        <button className="react-select-trigger">
          { currentValues.length > 0
            ? currentValues.join(', ')
            : defaultValue
          }
        </button>
        <div className="react-select-menu">
          <ul className="react-select-options">
            <CheckboxOption value="red" isChecked={currentValues.indexOf('red') > -1}>
              Red
            </CheckboxOption>
            <CheckboxOption value="green" isChecked={currentValues.indexOf('green') > -1}>
              Green
            </CheckboxOption>
            <CheckboxOption value="blue" isChecked={currentValues.indexOf('blue') > -1}>
              Blue
            </CheckboxOption>
          </ul>
        </div>
      </Select>
    )
  }
}