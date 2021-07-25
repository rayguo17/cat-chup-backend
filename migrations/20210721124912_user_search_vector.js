
const addUserVector = `
    ALTER TABLE public.user 
    ADD COLUMN "document" tsvector;
    CREATE FUNCTION my_trigger_function()
    RETURNS trigger AS $$
    BEGIN 
        NEW.document := to_tsvector(NEW.username);
        RETURN NEW;
    END $$ LANGUAGE 'plpgsql';
    CREATE TRIGGER my_trigger
    BEFORE INSERT ON public.user
    FOR EACH ROW
    EXECUTE PROCEDURE my_trigger_function();
    CREATE INDEX idx_fts_user ON public.user USING gin(document);
    update public.user
    set document = to_tsvector(username);
`
const removeUserIndex = `
    DROP TRIGGER IF EXISTS my_trigger ON public.user;
    DROP FUNCTION IF EXISTS my_trigger_function();
`

exports.up = function(knex) {
    return knex.schema.raw(addUserVector);
};

exports.down = function(knex) {
    return Promise.all([knex.schema.alterTable('user',table=>{
        table.dropColumn('document');

    }),knex.schema.raw(removeUserIndex)])
};
