#!/usr/bin/env python3
"""
Start Backend Server Script
"""

import subprocess
import sys
import os

def start_backend():
    """Start the FastAPI backend server"""
    print("🚀 Starting Camana Homes Backend...")
    print("=" * 40)
    
    # Change to api directory
    api_dir = os.path.join(os.path.dirname(__file__), 'api')
    os.chdir(api_dir)
    
    try:
        # Start uvicorn server
        subprocess.run([
            sys.executable, "-m", "uvicorn", 
            "main:app", 
            "--reload", 
            "--host", "0.0.0.0", 
            "--port", "8001"
        ], check=True)
    except KeyboardInterrupt:
        print("\n🛑 Backend server stopped.")
    except Exception as e:
        print(f"❌ Error starting backend: {e}")

if __name__ == "__main__":
    start_backend()
