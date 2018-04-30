import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurvey, setDrawer } from '../../actions';
import {
	ResponsiveContainer,
	PieChart,
	Pie,
	Sector,
	Cell,
	Legend
} from 'recharts';
//style components
import Chip from 'material-ui/Chip';
import Typography from 'material-ui/Typography';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	percent,
	index
}) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text
			x={x}
			y={y}
			fill="white"
			textAnchor={x > cx ? 'start' : 'end'}
			dominantBaseline="central">
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	);
};

const style = {
	lineHeight: '24px',
	top: 0,
	left: 300,
	width: 300,
	fontFamily: "'Roboto', 'sans-serif'"
};

class Feedback extends Component {
	render() {
		const { surveyData } = this.props;
		return (
			<div>
				<Typography variant="subheading">Emails sent:</Typography>
				<Typography variant="subheading">Emails responded:</Typography>
				<Typography variant="subheading">Questions:</Typography>
				<PieChart
					width={350}
					height={250}
					onMouseEnter={this.onPieEnter}
					style={{
						display: 'flex',
						flexDirection: 'row',
						flexWrap: 'wrap',
						width: '100%',
						height: '0'
					}}>
					<Pie
						data={surveyData}
						dataKey="elected"
						nameKey="choice"
						cx={150}
						cy={100}
						isAnimationActive={false}
						labelLine={false}
						label={renderCustomizedLabel}
						outerRadius={80}
						fill="#8884d8">
						{surveyData.map((entry, index) => (
							<Cell fill={COLORS[index % COLORS.length]} key={index} />
						))}
					</Pie>
					<Legend
						iconSize={14}
						layout="vertical"
						verticalAlign="middle"
						wrapperStyle={style}
					/>
				</PieChart>
			</div>
		);
	}
}

const mapStateToProps = ({ survey, drawer }) => ({ survey, drawer });

export default connect(mapStateToProps, { fetchSurvey, setDrawer })(Feedback);
