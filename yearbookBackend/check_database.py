#!/usr/bin/env python
"""
Check database tables and fix mugshot table issue
"""
import os
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'yearbookBackend.settings')
django.setup()

from django.db import connection

def check_database_tables():
    """Check what tables exist in the database"""
    
    print("🔍 Database Table Check")
    print("=" * 40)
    
    cursor = connection.cursor()
    
    # Check for mugshot-related tables
    cursor.execute("""
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name LIKE '%mugshot%'
    """)
    mugshot_tables = cursor.fetchall()
    
    print("Mugshot-related tables:")
    if mugshot_tables:
        for table in mugshot_tables:
            print(f"  ✅ {table[0]}")
    else:
        print("  ❌ No mugshot tables found!")
    
    # Check all yearbookBackend tables
    cursor.execute("""
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name LIKE 'yearbookBackend_%'
        ORDER BY table_name
    """)
    all_tables = cursor.fetchall()
    
    print(f"\nAll yearbookBackend tables ({len(all_tables)}):")
    for table in all_tables:
        print(f"  - {table[0]}")
    
    # Check specifically for the expected mugshot table
    expected_table = "yearbookBackend_mugshot"
    cursor.execute("""
        SELECT EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = %s
        )
    """, [expected_table])
    
    table_exists = cursor.fetchone()[0]
    
    print(f"\nExpected table '{expected_table}': {'✅ EXISTS' if table_exists else '❌ MISSING'}")
    
    return table_exists

def check_migration_status():
    """Check migration status"""
    
    print("\n🔄 Migration Status Check")
    print("=" * 40)
    
    cursor = connection.cursor()
    
    # Check applied migrations
    cursor.execute("""
        SELECT app, name 
        FROM django_migrations 
        WHERE app = 'yearbookBackend' 
        AND name LIKE '%mugshot%'
        ORDER BY id
    """)
    
    mugshot_migrations = cursor.fetchall()
    
    print("Mugshot-related migrations:")
    if mugshot_migrations:
        for app, name in mugshot_migrations:
            print(f"  ✅ {app}.{name}")
    else:
        print("  ❌ No mugshot migrations found!")
    
    return len(mugshot_migrations) > 0

if __name__ == '__main__':
    try:
        table_exists = check_database_tables()
        migrations_exist = check_migration_status()
        
        print("\n📊 Summary:")
        print(f"  Mugshot table exists: {'✅' if table_exists else '❌'}")
        print(f"  Mugshot migrations applied: {'✅' if migrations_exist else '❌'}")
        
        if not table_exists:
            print("\n💡 Recommended fix:")
            print("  Run: python manage.py migrate --run-syncdb")
            print("  Or: python manage.py migrate yearbookBackend 0011 --fake-initial")
            
    except Exception as e:
        print(f"❌ Error checking database: {e}")
