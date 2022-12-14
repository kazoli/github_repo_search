import { useAppDispatch } from '../../app/general/hooks';
import { searchAction, searchReset } from '../../app/search/searchSlice';
import { FcSearch } from 'react-icons/fc';
import Button from '../form/Button';

function SearchButtonBlock() {
  const dispatch = useAppDispatch();

  return (
    <div className="form-element button-block">
      <Button
        wrapperClass="button click"
        icon={<FcSearch className="search-magnifier" />}
        label=""
        action={() => dispatch(searchAction('validation'))}
      />
      <Button
        wrapperClass="button click"
        icon={false}
        label="Reset"
        action={() => dispatch(searchReset())}
      />
    </div>
  );
}

export default SearchButtonBlock;
