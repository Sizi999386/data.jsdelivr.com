const { makeEndpointTests, setupSnapshots } = require('../../utils');

const periodOptions = [ 'day', 'week', 'month', 'year', 'all', undefined ];

describe('/v1/stats', () => {
	before(() => {
		setupSnapshots(__filename);
	});

	makeStatsPackagesTests();
	makeStatsNetworkTests();
});

function makeStatsPackagesTests () {
	makeEndpointTests('/v1/stats/packages{/type}{/period}{?page,limit}', {
		period: 'month',
	}, [
		{ page: 2 },
		{ page: 2, limit: 10 },
		{
			type: [ 'gh', 'npm', undefined ],
			period: periodOptions,
		},
	]);

	makeEndpointTests('/v1/stats/packages{/type}{/period}{?page,limit}', {
		period: 'month',
	}, [
		{ page: 0 },
		{ page: 'x' },
		{ limit: 1000 },
	], { status: 400 });
}

function makeStatsNetworkTests () {
	makeEndpointTests('/v1/stats/network{/period}', {
		period: 'month',
	}, [
		{
			period: periodOptions,
		},
	]);
}
