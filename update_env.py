#!/usr/bin/env python3
"""
Update .env file with correct AWS RDS database URL
"""

import os

def update_env_file():
    """Update the .env file with correct database URL"""
    
    # Your AWS RDS credentials
    db_url = "postgresql+asyncpg://camana_u:camana12345@camana.c90q66es89vi.ap-south-1.rds.amazonaws.com/camana_db"
    
    # Create .env file content
    env_content = f"""# Database Configuration - AWS RDS
DATABASE_URL={db_url}
"""
    
    # Write to .env file
    with open('.env', 'w') as f:
        f.write(env_content)
    
    print("✅ .env file updated with AWS RDS credentials!")
    print(f"   Database URL: {db_url}")

if __name__ == "__main__":
    update_env_file()
