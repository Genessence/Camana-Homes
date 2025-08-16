#!/usr/bin/env python3
"""
Simple Backend Startup Script
"""

import os
import sys
import subprocess

def main():
    print("🚀 Starting Camana Homes Backend...")
    print("=" * 50)
    
    # Change to api directory
    api_dir = os.path.join(os.path.dirname(__file__), 'api')
    print(f"📁 Changing to directory: {api_dir}")
    os.chdir(api_dir)
    
    # Check if files exist
    if not os.path.exists('main.py'):
        print("❌ main.py not found!")
        return
    
    print("✅ main.py found")
    
    # Try to import main
    try:
        import main
        print("✅ main.py imports successfully")
    except Exception as e:
        print(f"❌ Error importing main.py: {e}")
        return
    
    # Start uvicorn
    print("🌐 Starting uvicorn server...")
    print("   URL: http://localhost:8001")
    print("   API Docs: http://localhost:8001/docs")
    print("   Press Ctrl+C to stop")
    print("-" * 50)
    
    try:
        subprocess.run([
            sys.executable, "-m", "uvicorn", 
            "main:app", 
            "--reload", 
            "--host", "0.0.0.0", 
            "--port", "8001"
        ], check=True)
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
    except Exception as e:
        print(f"❌ Error starting server: {e}")

if __name__ == "__main__":
    main()
