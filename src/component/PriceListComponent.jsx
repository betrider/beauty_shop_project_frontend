import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

const StyledTableHeaderCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.hover,
    fontSize: 20
  },
  body: {
    fontSize: 14
  },
}))(TableCell);

const StyledTableCell = withStyles((theme) => ({
  head: {
    // backgroundColor: theme.palette.common.hover,
    // color: theme.palette.common.white,
    backgroundColor: theme.palette.common.hover,
    fontWeight:"bold"
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, bath, clipping, spotting, cut) {
  return { name, bath, clipping, spotting, cut };
}

const beautyPriceSmall = [
  createData('4KG', '20.', '35.', '70.', '80.'),
  createData('6KG', '25.', '40.', '80.', '90.'),
  createData('8KG', '30.', '45.', '90.', '100.'),
];

const beautyPriceBig = [
    createData('4KG', '25.', '40.', '80.', '90.'),
    createData('6KG', '30.', '45.', '90.', '100.'),
    createData('8KG', '35.', '50.', '100.', '110.'),
  ];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function PriceListComponent() {
  const classes = useStyles();

  return (
      <div>
        <Container fixed>
          <br></br>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableHeaderCell align="center" colSpan={5}>
                            소형견 토이푸들(4KG미만) 얼굴컷 별도
                        </StyledTableHeaderCell>
                    </TableRow>
                    <TableRow>
                        <StyledTableCell>몸무게</StyledTableCell>
                        <StyledTableCell align="right">목욕</StyledTableCell>
                        <StyledTableCell align="right">클리핑</StyledTableCell>
                        <StyledTableCell align="right">스포팅</StyledTableCell>
                        <StyledTableCell align="right">가위컷</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {beautyPriceSmall.map((row) => (
                    <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                        {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.bath}</StyledTableCell>
                    <StyledTableCell align="right">{row.clipping}</StyledTableCell>
                    <StyledTableCell align="right">{row.spotting}</StyledTableCell>
                    <StyledTableCell align="right">{row.cut}</StyledTableCell>
                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
          </TableContainer>
          <br></br>
          <br></br>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                  <TableRow>
                      <StyledTableHeaderCell align="center" colSpan={5}>
                          중형견 믹스(폼피츠 포함) 체구가 큰 5KG이상 미니어쳐푸들 얼굴컷 별도
                      </StyledTableHeaderCell>
                  </TableRow>
                  <TableRow>
                      <StyledTableCell>몸무게</StyledTableCell>
                      <StyledTableCell align="right">목욕</StyledTableCell>
                      <StyledTableCell align="right">클리핑</StyledTableCell>
                      <StyledTableCell align="right">스포팅</StyledTableCell>
                      <StyledTableCell align="right">가위컷</StyledTableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
              {beautyPriceBig.map((row) => (
                  <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                      {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.bath}</StyledTableCell>
                  <StyledTableCell align="right">{row.clipping}</StyledTableCell>
                  <StyledTableCell align="right">{row.spotting}</StyledTableCell>
                  <StyledTableCell align="right">{row.cut}</StyledTableCell>
                  </StyledTableRow>
              ))}
              </TableBody>
            </Table>
            </TableContainer>
        </Container>
      </div>
  );
}