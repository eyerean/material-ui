import React, {Component, PropTypes} from 'react';
import TextField from '../TextField';
import _ from 'lodash';

class NumberField extends Component {

    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
        defaultValue: PropTypes.any,
        disabled: PropTypes.bool,
        errorStyle: PropTypes.object,
        errorText: PropTypes.node,
        floatingLabelFixed: PropTypes.bool,
        floatingLabelFocusStyle: PropTypes.object,
        floatingLabelStyle: PropTypes.object,
        floatingLabelText: PropTypes.node,
        fullWidth: PropTypes.bool,
        hintStyle: PropTypes.object,
        hintText: PropTypes.node,
        id: PropTypes.string,
        inputStyle: PropTypes.object,
        max: PropTypes.number,
        min: PropTypes.number,
        multiLine: PropTypes.bool,
        name: PropTypes.string,
        onChange: PropTypes.func,
        onKeyDown: PropTypes.func,
        rows: PropTypes.number,
        rowsMax: PropTypes.number,
        step: PropTypes.number,
        style: PropTypes.object,
        textareaStyle: PropTypes.object,
        type: PropTypes.string,
        underlineDisabledStyle: PropTypes.object,
        underlineFocusStyle: PropTypes.object,
        underlineShow: PropTypes.bool,
        underlineStyle: PropTypes.object,
        value: PropTypes.any
    };

    state = {
        value: this.props.value,
        step: this.props.step ? this.props.step : 1
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
          value: this.parse(nextProps.value)
        });
    }

    setValue = (value) => {
        let parsedValue = this.parse(value);
        this.setState({
            value: parsedValue
        });
        if (_.isFunction(this.props.onChange)){
            this.props.onChange(parsedValue);
        }
    }

    handleChange = (e) => {
        this.setValue(e.target.value);
    }

    handleKeyDown = (e) => {
        const KEY_UP = 38;
        const KEY_DOWN = 40;

        switch(e.keyCode) {
            case KEY_UP:
                e.preventDefault();
                this.handleUp();
                break;
            case KEY_DOWN:
                e.preventDefault();
                this.handleDown();
                break;
        }
    }

    handleUp = () => {
        if(this.state.value){
            let p = (this.state.step.toString().split('.')[1] || []).length;
            let newValue = parseFloat(this.state.value)+this.state.step;
            if(p) {
                newValue = parseFloat(newValue.toFixed(p));
            }
            this.setValue(newValue);
        }else{
            this.setValue("0");
        }
    }

    handleDown = () => {
        if(this.state.value){
            let p = (this.state.step.toString().split('.')[1] || []).length;
            let newValue = parseFloat(this.state.value)-this.state.step;
            if(p) {
                newValue = parseFloat(newValue.toFixed(p));
            }
            this.setValue(newValue);
        }else{
            this.setValue("0");
        }
    }

    parse(value) {
        if(value === '') return '';

        if(value){
            value = _.replace(value.toString(), ',', '.');
            if(isNaN(value)) return '';
        }

        let lastChar = value[value.length-1];
        let secondLastChar = value[value.length-2];
        if(lastChar ==='.' || (lastChar==="0" && secondLastChar==".")){
            return value;
        }
        if(!_.isUndefined(this.props.max)){
            let max = this.props.max;
            if(typeof max === 'number' && parseFloat(value) > max) return max;
        }
        if(!_.isUndefined(this.props.min)){
            let min = this.props.min;
            if(typeof min === 'number' && parseFloat(value) < min) return min;
        }

        return value;
    }

    render(){
        const {
            children, 
            className, 
            defaultValue, 
            disabled, 
            errorStyle, 
            errorText,
            floatingLabelFixed, 
            floatingLabelFocusStyle, 
            floatingLabelStyle, 
            floatingLabelText, 
            fullWidth,
            hintStyle, 
            hintText, 
            id, 
            inputStyle, 
            max, 
            min, 
            multiLine, 
            name, 
            rows, 
            rowsMax, 
            step, 
            style,
            textareaStyle, 
            underlineDisabledStyle, 
            underlineFocusStyle, 
            underlineShow, 
            underlineStyle,
            ...rest
        } = this.props;

        return (
            <TextField {...rest}
                children={children}
                className={className}
                defaultValue={defaultValue}
                disabled={disabled}
                errorStyle={errorStyle}
                errorText={errorText}
                floatingLabelFixed={floatingLabelFixed}
                floatingLabelFocusStyle={floatingLabelFocusStyle}
                floatingLabelStyle={floatingLabelStyle}
                floatingLabelText={floatingLabelText}
                fullWidth={fullWidth}
                hintStyle={hintStyle}
                hintText={hintText}
                id={id}
                inputStyle={inputStyle}
                max={max}
                min={min}
                multiLine={multiLine}
                name={name}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
                rows={rows}
                rowsMax={rowsMax}
                step={step}
                style={style}
                textareaStyle={textareaStyle}
                type="text"
                underlineDisabledStyle={underlineDisabledStyle}
                underlineFocusStyle={underlineFocusStyle}
                underlineShow={underlineShow}
                underlineStyle={underlineStyle}
                value={this.state.value}
            />
        );
    }
}

export default NumberField;
