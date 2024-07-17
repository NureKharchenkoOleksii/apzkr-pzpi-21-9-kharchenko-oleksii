import time
import random
import requests
from datetime import datetime

class IoTDevice:
    def __init__(self, device_id, server_url):
        self.device_id = device_id
        self.server_url = server_url
        self.latitude = 50.4501  # Example: Kyiv latitude
        self.longitude = 30.5234  # Example: Kyiv longitude
        self.current_price = "N/A"
        self.wifi_strength = -70  # Example WiFi strength in dBm

    def update_gps(self):
        # Simulate small changes in GPS position
        self.latitude += random.uniform(-0.0001, 0.0001)
        self.longitude += random.uniform(-0.0001, 0.0001)

    def check_price_update(self):
        try:
            response = requests.get(f"{self.server_url}/price",
                                    params={"lat": self.latitude, "lon": self.longitude})
            if response.status_code == 200:
                new_price = response.json()["price"]
                if new_price != self.current_price:
                    self.current_price = new_price
                    print(f"Price updated: {self.current_price}")
                    self.update_display()
            else:
                print(f"Failed to get price update. Status code: {response.status_code}")
        except requests.RequestException as e:
            print(f"Error checking price update: {e}")

    def update_display(self):
        print(f"E-Paper Display Update: Price: {self.current_price}")

    def send_status(self):
        status_data = {
            "device_id": self.device_id,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "price": self.current_price,
            "wifi_strength": self.wifi_strength,
            "timestamp": datetime.now().isoformat()
        }
        try:
            response = requests.post(f"{self.server_url}/status", json=status_data)
            if response.status_code == 200:
                print("Status sent successfully")
            else:
                print(f"Failed to send status. Status code: {response.status_code}")
        except requests.RequestException as e:
            print(f"Error sending status: {e}")

    def run(self):
        while True:
            self.update_gps()
            self.check_price_update()
            self.send_status()
            self.wifi_strength = random.randint(-80, -30)  # Simulate changing WiFi strength
            time.sleep(30)  # Wait for 30 seconds before next cycle

# Simulated server endpoints
class MockServer:
    def __init__(self):
        self.price = "100.00"

    def get_price(self, lat, lon):
        # In a real scenario, price might depend on location
        return {"price": self.price}

    def update_status(self, status_data):
        print(f"Received status update from device {status_data['device_id']}:")
        print(f"  Location: {status_data['latitude']}, {status_data['longitude']}")
        print(f"  Current Price: {status_data['price']}")
        print(f"  WiFi Strength: {status_data['wifi_strength']} dBm")
        print(f"  Timestamp: {status_data['timestamp']}")
        return {"status": "received"}

# Simulation runner
def run_simulation():
    server = MockServer()
    device = IoTDevice("IOT001", "http://mock-server")

    # Monkey patch requests to use our mock server
    def mock_get(url, params=None):
        class MockResponse:
            def __init__(self, json_data, status_code):
                self.json_data = json_data
                self.status_code = status_code

            def json(self):
                return self.json_data

        if url.endswith("/price"):
            return MockResponse(server.get_price(params['lat'], params['lon']), 200)
        return MockResponse(None, 404)

    def mock_post(url, json=None):
        class MockResponse:
            def __init__(self, json_data, status_code):
                self.json_data = json_data
                self.status_code = status_code

        if url.endswith("/status"):
            return MockResponse(server.update_status(json), 200)
        return MockResponse(None, 404)

    requests.get = mock_get
    requests.post = mock_post

    print("Starting IoT device simulation...")
    device.run()

if __name__ == "__main__":
    run_simulation()