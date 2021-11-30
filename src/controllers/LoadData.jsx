import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadExpenses } from '../store/expenses';
import { loadCategories } from '../store/categories';
import { setViewWidth, setViewHeight } from '../store/interface';
import useViewport from '../hooks/useViewport';

export default function LoadData({children}) {
  const dispatch = useDispatch();
  const { width, height } = useViewport();

  useEffect(() => dispatch(loadExpenses()), []);
  useEffect(() => dispatch(loadCategories()), []);
  useEffect(() => dispatch(setViewHeight(height)), [height]);
  useEffect(() => dispatch(setViewWidth(width)), [width]);

  return (
    <div>
      {children}
    </div>
  );
}