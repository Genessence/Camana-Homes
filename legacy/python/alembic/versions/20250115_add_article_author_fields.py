"""add article author fields

Revision ID: 20250115_add_article_author_fields
Revises: 
Create Date: 2025-01-15 00:00:00

"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a20250115af'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    with op.batch_alter_table('articles') as batch:
        batch.add_column(sa.Column('author_bio', sa.Text(), nullable=True))
        batch.add_column(sa.Column('author_website_url', sa.String(length=1024), nullable=True))
        batch.add_column(sa.Column('author_instagram_url', sa.String(length=1024), nullable=True))
        batch.add_column(sa.Column('author_linkedin_url', sa.String(length=1024), nullable=True))
        batch.add_column(sa.Column('author_youtube_url', sa.String(length=1024), nullable=True))


def downgrade() -> None:
    with op.batch_alter_table('articles') as batch:
        batch.drop_column('author_youtube_url')
        batch.drop_column('author_linkedin_url')
        batch.drop_column('author_instagram_url')
        batch.drop_column('author_website_url')
        batch.drop_column('author_bio')


