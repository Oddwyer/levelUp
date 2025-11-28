 -- Add the new column user_id
ALTER TABLE expense
    ADD COLUMN user_id BIGINT DEFAULT NULL;

-- Add foreign key constraint
ALTER TABLE expense
    ADD CONSTRAINT fk_expense_user
        FOREIGN KEY (user_id) REFERENCES user(id);

-- Add index for the foreign key
CREATE INDEX idx_expense_user_id ON expense(user_id);