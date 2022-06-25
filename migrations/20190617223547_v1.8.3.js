exports.up = async (db) => {
	await db.schema.createTable('package_listing', (table) => {
		table.string('type');
		table.string('name');
		table.string('version');
		table.text('listing', 'mediumtext');
		table.primary([ 'type', 'name', 'version' ]);
	});

	await db.schema.raw('alter table package_listing row_format = compressed;');
};

exports.down = () => {};
