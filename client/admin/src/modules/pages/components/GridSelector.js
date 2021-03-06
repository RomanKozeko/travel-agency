import React from 'react';
import PropTypes from 'prop-types';
import GridIcons from '../../ui-elements/gridIcons/GridIcons';

const GridSelector = ({ count, pageAddRow, pageAddCustomRow, lang }) => {
  const rows = [];
  for (let i = 0; i < count; i++) {
    rows.push(
      <div key={i} className="col-sm-3">
        <GridIcons count={i + 1} clickHandler={() => pageAddRow(i + 1, lang)} />
      </div>
    );
  }

  return (
    <div>
      <div className="row">{rows}</div>

      <div className="row">
        <div className="col-sm-3">
          <div
            className="Grid-icons"
            onClick={() =>
              pageAddCustomRow({ langId: lang, type: '@hotelSearch' })
            }
          >
            <div className="Grid-icons__inner">Форма поиска отелей</div>
          </div>
        </div>

        <div
          className="col-sm-3"
          onClick={() =>
            pageAddCustomRow({ langId: lang, type: '@toursSearch' })
          }
        >
          <div className="Grid-icons">
            <div className="Grid-icons__inner">Форма поиска туров</div>
          </div>
        </div>

        <div
          className="col-sm-3"
          onClick={() =>
            pageAddCustomRow({ langId: lang, type: '@showPlacesSearch' })
          }
        >
          <div className="Grid-icons">
            <div className="Grid-icons__inner">
              Форма поиска достопримечательностей
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

GridSelector.propTypes = {
  count: PropTypes.number,
  clickHandler: PropTypes.func,
};

export default GridSelector;
