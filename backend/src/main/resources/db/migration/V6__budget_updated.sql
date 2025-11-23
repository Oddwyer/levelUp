DROP TABLE IF EXISTS budget;

CREATE TABLE budget (
                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        category VARCHAR(100) NOT NULL,
                        amount DOUBLE NOT NULL,
                        description VARCHAR(255),
                        budget_date DATE,
                        user_id BIGINT DEFAULT NULL,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        CONSTRAINT fk_budget_user FOREIGN KEY (user_id) REFERENCES user(id)
);

-- Add index for faster queries on user_id
CREATE INDEX idx_budget_user_id ON budget(user_id);