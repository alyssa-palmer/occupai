
import { useState } from 'react';
import { Switch } from 'react-native-paper';

const Slider = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return <Switch value={isSwitchOn} onValueChange={onToggleSwitch} color="#292112"/>;
};

export default Slider;