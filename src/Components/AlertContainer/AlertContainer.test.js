import AlertContainer , {AlertContainerDefaultProps} from './AlertContainer';
import renderer from 'react-test-renderer';

it('Default State of AlertContainer', () => {   
    const DateInputComponent = renderer.create(<AlertContainer {...AlertContainerDefaultProps} />).toJSON();
    expect(DateInputComponent).toMatchSnapshot();
});