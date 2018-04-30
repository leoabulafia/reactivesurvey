import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setDrawer } from '../../actions';
import Chip from 'material-ui/Chip';
import Typography from 'material-ui/Typography';
//components
import MainDrawer from '../MainDrawer';
import NewSurveyButton from './NewSurveyButton';
import Title from './Title';
import SurveyList from './SurveyList';

class Dashboard extends Component {
	handleOpen = () => {
		this.props.setDrawer(true);
	};
	render() {
		return (
			<MainDrawer url={this.props.match.url}>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					{this.props.drawer ? (
						<div />
					) : (
						<Chip
							style={{ margin: '9px 10px 5px 10px' }}
							onClick={this.handleOpen}
							label="... Show Options"
						/>
					)}
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
	}
}

const mapStateToProps = ({ drawer }) => ({ drawer });

export default connect(mapStateToProps, { setDrawer })(Dashboard);
