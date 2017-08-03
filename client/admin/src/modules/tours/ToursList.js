import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import keycode from 'keycode';
import Table, {
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TableSortLabel,
} from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import FilterListIcon from 'material-ui-icons/FilterList';

class ToursList extends Component {
	state = {
		order: 'asc',
		orderBy: 'calories',
		selected: []
	};

	handleRequestSort = (event, property) => {
		const orderBy = property;
		let order = 'desc';

		if (this.state.orderBy === property && this.state.order === 'desc') {
			order = 'asc';
		}

		const data = this.state.data.sort(
			(a, b) => (order === 'desc' ? b[orderBy] > a[orderBy] : a[orderBy] > b[orderBy]),
		);

		this.setState({ data, order, orderBy });
	};

	handleSelectAllClick = (event, checked) => {
		if (checked) {
			this.setState({ selected: this.state.data.map(n => n.id) });
			return;
		}
		this.setState({ selected: [] });
	};

	handleKeyDown = (event, id) => {
		if (keycode(event) === 'space') {
			this.handleClick(event, id);
		}
	};

	handleClick = (event, id) => {
		const { selected } = this.state;
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1),
			);
		}

		this.setState({ selected: newSelected });
	};

	isSelected = id => this.state.selected.indexOf(id) !== -1;

	render() {
		const { order, orderBy, selected } = this.state;

		return (
      <Paper>
        <Table>

          <TableBody>
						{this.props.tours.map(n => {
							const isSelected = this.isSelected(n.id);
							return (
                <TableRow
                  hover
                  onClick={event => this.handleClick(event, n.id)}
                  onKeyDown={event => this.handleKeyDown(event, n.id)}
                  role="checkbox"
                  aria-checked={isSelected}
                  tabIndex="-1"
                  key={n.id}
                  selected={isSelected}
                >
                  <TableCell checkbox>
                    <Checkbox checked={isSelected} />
                  </TableCell>
                  <TableCell numeric>
		                {n.preview}
                  </TableCell>
                  <TableCell disablePadding>
										{n.content.title}
                  </TableCell>
                  <TableCell numeric>
										{n.content.description}
                  </TableCell>
                  <TableCell numeric>
										{n.content.content}
                  </TableCell>
                  <TableCell numeric>
										{n.content.language}
                  </TableCell>
                </TableRow>
							);
						})}
          </TableBody>
        </Table>
      </Paper>
		);
	}
}

const ToursList1 = ({tours}) => {
  return (
    <div>
      <h2>Tours</h2>
      <ul>
        {tours.map((tour, i) => (
          <li key={i}>{tour.content[0].title}</li>
        ))
        }
      </ul>
    </div>
  );
};

export default ToursList