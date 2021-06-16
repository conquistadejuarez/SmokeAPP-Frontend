import React, {useState} from 'react';
import {View, Button, Platform, TouchableHighlight, TouchableOpacity, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import moment from 'moment';

const datetime = (props) => {

  moment.locale('rs');

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || props.date;
    setShow(Platform.OS === 'ios');
    props.setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View>
         <View style={{height:50, justifyContent:'center', alignItems:'center',}}>
        <TouchableHighlight onPress={showDatepicker}>
            <Text style={{color:'#000', fontSize:hp('3.5%'), height:60,}}>{moment(props.date).format('ll')}</Text>
        </TouchableHighlight>
      </View>
      {show && (
        <DateTimePicker
          onPress={showDatepicker}
          testID="dateTimePicker"
          value={props.date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );


}



  export default datetime