import React from 'react';
import { connect } from 'react-redux';
import { setDrawer } from '../../actions';
import Typography from 'material-ui/Typography';
//components
import MainDrawer from '../MainDrawer';
import NewSurveyButton from './NewSurveyButton';
import SurveyList from './SurveyList';

const Dashboard = props => (
	<MainDrawer url={props.match.url}>
		<div style={{ display: 'flex', alignItems: 'center' }}>
			<div style={{ flexDirection: 'row' }}>
				<Typography variant="headline">Welcome to the Dashboard</Typography>
				<Typography variant="subheading">
					See your surveys or create new ones
				</Typography>
			</div>
		</div>

		<div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
			<SurveyList />
			<NewSurveyButton />
		</div>
	</MainDrawer>
);

const mapStateToProps = ({ drawer }) => ({ drawer });

export default connect(mapStateToProps, { setDrawer })(Dashboard);
