import React from 'react';

const VuroxFormSearch = (props) => {
  return (
    <React.Fragment>
      <form action="" className={props.className + ' vurox-search-from'}>
          {props.icon}
          <input type="search" name="s" className={props.border} placeholder={props.placeholder} />
      </form>
    </React.Fragment>
  )
}

export default VuroxFormSearch;