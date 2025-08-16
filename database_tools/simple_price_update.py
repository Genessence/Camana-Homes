#!/usr/bin/env python3
"""
Simple Price Update Script
"""

import psycopg2
from psycopg2.extras import RealDictCursor

def update_prices():
    """Update property prices with realistic Dubai values"""
    print("💰 Updating Property Prices...")
    print("=" * 40)
    
    # Database connection
    conn = psycopg2.connect(
        host="camana.c90q66es89vi.ap-south-1.rds.amazonaws.com",
        database="camana_db",
        user="camana_u",
        password="camana12345"
    )
    
    cursor = conn.cursor()
    
    # Realistic Dubai property prices
    price_updates = [
        ("binghatti-aurora", 850000, "JVC District 12 - 2BR/2BA"),
        ("bugatti-residences-by-binghatti-riviera-saint-tropez", 2800000, "Business Bay - 3BR/4BA"),
        ("binghatti-ghost", 1200000, "Al Jaddaf - 2BR/2BA"),
        ("binghatti-ivory", 1100000, "Al Jaddaf - Dubai Health Care City 2 - 2BR/2BA"),
        ("bugatti-residences-by-binghatti-3br-golden-visa", 3200000, "Business Bay - 3BR/3BA"),
        ("burj-binghatti-jacob-and-co-astronomia-sky-penthouse", 8500000, "Business Bay - 5BR/7BA Sky Penthouse"),
        ("dubai-creek-harbour-fleurs-de-jardin-sky-mansion", 12000000, "Business Bay - 6BR/9BA Sky Mansion"),
    ]
    
    for slug, price, description in price_updates:
        try:
            cursor.execute(
                "UPDATE properties SET price_amount = %s WHERE slug = %s",
                (price, slug)
            )
            print(f"✅ Updated: {slug}")
            print(f"   Price: ${price:,.0f}")
            print(f"   Description: {description}")
            print()
        except Exception as e:
            print(f"❌ Error updating {slug}: {e}")
    
    conn.commit()
    
    # Show final prices
    print("📊 Final Price Summary:")
    print("-" * 40)
    cursor.execute("SELECT title, price_amount FROM properties ORDER BY price_amount DESC")
    for row in cursor.fetchall():
        print(f"• {row[0]}: ${row[1]:,.0f}")
    
    cursor.close()
    conn.close()
    print("\n🎉 All prices updated successfully!")

if __name__ == "__main__":
    update_prices()
