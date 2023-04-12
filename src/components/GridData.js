
import { makeStyles } from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import React from 'react';

const GridData = ({data}) => {
    const classes = useStyles();
    const featureRows = {};
    const getStatusColor = (status) => {
        switch(status) {
            case 'passed':
                return "#4caf50";
            case 'failed':
                return "#f44336";
            case 'skipped':
                return "#0088FE";
            case 'pending':
                return "#8609F5";
            case 'undefined':
                return "#9F1090";
            default:
                return '#FFFFFF';
        }
    };
  return (
    <TableContainer className={classes.TableContainer} >
    <Table  className={classes.table}   >
        <TableHead >
            <TableRow >
                <TableCell  >Features</TableCell>
                <TableCell>Features Duration</TableCell>
                <TableCell>Features Status</TableCell>
                <TableCell>Scenarios</TableCell>
                <TableCell>Scenarios Duration</TableCell>
                <TableCell>Scenarios Status</TableCell>
                <TableCell>Steps</TableCell>
                <TableCell>Steps Duration</TableCell>
                <TableCell>Steps Status</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {data.features.map(feature => {
                const numFeatureRows = feature.scenarios.reduce((totalSteps, currentScenario) => totalSteps + currentScenario.steps.length, 0);

                featureRows[feature.name] = numFeatureRows;

                return feature.scenarios.map((scenario, scenarioIndex) => (
                    scenario.steps.map((step, stepIndex) => {
                        const isFeatureFirstRow = scenarioIndex === 0 && stepIndex === 0;

                        return (
                            <TableRow key={`${feature.name}-${scenario.name}-${step.name}`}>
                                {isFeatureFirstRow && (
                                    <TableCell rowSpan={numFeatureRows} component="th" scope="row">
                                        {feature.name}
                                    </TableCell>
                                )}
                                {stepIndex === 0 && scenarioIndex === 0 && (
                                    <TableCell rowSpan={numFeatureRows}>{feature.duration}</TableCell>
                                )}
                                {stepIndex === 0 && scenarioIndex === 0 && (
                                    <TableCell rowSpan={numFeatureRows} style={{backgroundColor: getStatusColor(feature.status)}}>{feature.status}</TableCell>
                                )}
                                {stepIndex === 0 && (
                                    <TableCell rowSpan={scenario.steps.length}>{scenario.name}</TableCell>
                                )}
                                {stepIndex === 0 && (
                                    <TableCell rowSpan={scenario.steps.length}>{scenario.duration}</TableCell>
                                )}
                                {stepIndex === 0 && (
                                    <TableCell rowSpan={scenario.steps.length} style={{backgroundColor: getStatusColor(scenario.status)}}>{scenario.status}</TableCell>
                                )}
                                <TableCell>{step.name}</TableCell>
                                <TableCell>{step.duration}</TableCell>
                                <TableCell style={{backgroundColor: getStatusColor(step.status)}}>{step.status}</TableCell>
                            </TableRow>
                        );
                    })
                ));
            })}
        </TableBody>
    </Table>
</TableContainer>
  );
}
  
export default GridData

const useStyles = makeStyles({
    table: {
      minWidth: 650,
      border:"1px solid gray",
      color:'primary.main',
      
    },
    TableContainer:{
      width:"100%",
      padding:"20px"
    },
   
  });