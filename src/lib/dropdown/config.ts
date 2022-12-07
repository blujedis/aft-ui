import { classnames } from '@forewind/util';
import { config } from '../app/config';

const { common } = config;

const main = {
	base: classnames(
		'focus:ring-0 inline-flex items-center justify-center font-medium focus:outline-none text-sm border border-transparent',
		common.shadow
	),
	variant: {

	}
};

const button = { main };

export default button;
