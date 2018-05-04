import React from 'react';
import Checkbox from 'material-ui/Checkbox';

export default ({ input, checked, handleChange, value }) => {
	return (
		<div>
			<Checkbox checked={checked} onChange={handleChange} value={value} />
		</div>
	);
};
