var React = require("react");
var { View, Text, TouchableHighlight } = require("react-native");

function renderRowWithoutButtons(item) {
  return <View key={item.key}>{item.input}</View>;
}

function renderRowButton(button, stylesheet, style) {
  return (
    <TouchableHighlight
      key={button.type}
      style={[stylesheet.button, style]}
      onPress={button.click}
    >
      <Text style={stylesheet.buttonText}>{button.label}</Text>
    </TouchableHighlight>
  );
}

function renderButtonGroup(buttons, stylesheet) {
  return (
    <View style={{ flexDirection: "row" , alignSelf: 'center', marginTop: 20}}>
      {buttons.map(button =>
        renderRowButton(button, stylesheet, { width: 130, marginHorizontal: 10 })
      )}
    </View>
  );
}

function renderRow(item, stylesheet) {
  return (
    <View key={item.key} style={{ flexDirection: "row" }}>
      <View style={{ flex: 1 }}>{item.input}</View>
      {/*<View style={{ flex: 1 }}>
        {renderButtonGroup(item.buttons, stylesheet)}
  </View>*/}
    </View>
  );
}

function list(locals, type) {
  if (locals.hidden) {
    return null;
  }

  var stylesheet = locals.stylesheet;
  var fieldsetStyle = stylesheet.fieldset;
  var controlLabelStyle = stylesheet.controlLabel.normal;

  if (locals.hasError) {
    controlLabelStyle = stylesheet.controlLabel.error;
  }

  var label = locals.label ? (
    <Text style={controlLabelStyle}>{locals.label}</Text>
  ) : null;
  var error =
    locals.hasError && locals.error ? (
      <Text accessibilityLiveRegion="polite" style={stylesheet.errorBlock}>
        {locals.error}
      </Text>
    ) : null;

  var rows = locals.items.map(function(item) {
    return item.buttons.length === 0
      ? renderRowWithoutButtons(item)
      : renderRow(item, stylesheet);
  });

 function createButtons() {
    var lineAmount = type === 'xray' ? 25 : 15;
    var add = locals.items.length < lineAmount ? locals.add : null
    var remove = locals.items.length > 0 ? locals.items[locals.items.length-1].buttons[0] : null

    if(add && remove) {
      return renderButtonGroup([add, remove], stylesheet)
    }
    else if (add) {
      return renderButtonGroup([add], stylesheet)
    }
    else if (remove) {
      return renderButtonGroup([remove], stylesheet)
    }
    else {
      return null
    }
  }

  var buttons = createButtons()
  var addButton = locals.add ? renderRowButton(locals.add, stylesheet) : null;

  function setWarning() {
    if(locals.items.length === 25) {
      return (<View>
                  <Text style={{color: '#961c00'}}>Number of Rows cannot exceed 25.</Text>
                   <Text style={{color: '#961c00'}}>If more rows are required start a new form page.</Text></View>)
    }
    else {
      return null
    }
  }

  var warning = setWarning()

  return (
    <View style={fieldsetStyle}>
      {label}
      {error}
      {rows}
      {buttons}
      {warning}
    </View>
  );
}

module.exports = list;
