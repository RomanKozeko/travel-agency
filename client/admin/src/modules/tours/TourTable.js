import React, { Component } from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { Link } from 'react-router-dom';

class TourTable extends Component {

  render() {
    let { cells, data } = this.props;
	  return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Language</TableCell>
            <TableCell>Content</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
				  {data.map(n => {
					  return (
              <TableRow key={n._id}>
                <TableCell>
	                <Link to={`/tours/${n._id}`}>{n.content[0].title}</Link>
                </TableCell>
                <TableCell>
								  {n.content[0].description}
                </TableCell>
                <TableCell>
								  {n.preview}
                </TableCell>
                <TableCell>
								  {n.content[0].content}
                </TableCell>
              </TableRow>
					  );
				  })}
        </TableBody>
      </Table>
	  );
  }
}

export default TourTable;