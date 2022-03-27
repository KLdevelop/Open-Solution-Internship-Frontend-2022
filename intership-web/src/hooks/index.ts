import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'Common/Models/store';
import { RootState as RState } from 'Src/store/reducers';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTypedSelector: TypedUseSelectorHook<RState> = useSelector;
