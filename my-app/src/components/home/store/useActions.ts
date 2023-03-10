import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from './action-creators';

export const useActions = () => {
	const dispatch = useDispatch();
	return bindActionCreators(actions, dispatch);
}