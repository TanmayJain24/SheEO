import json
import sys
import numpy as np
import time
from sklearn.neighbors import NearestNeighbors

class MLSystem:
    def __init__(self):
        self.ready = False
        self.user_domains = {}
        self.post_features = {}
        self.feature_space = {}
        self.post_metadata = {}
        self.knn_model = None
        self._training_timer = None
        self._log("System initialized")

    def _log(self, message):
        sys.stderr.write(json.dumps({"log": message}) + '\n')
        sys.stderr.flush()

    def _send(self, message):
        sys.stdout.write(json.dumps(message) + '\n')
        sys.stdout.flush()

    def add_user(self, user_id, domains):
        self.user_domains[user_id] = [d.lower() for d in domains]
        self._update_feature_space(domains)
        self._log(f"Added user {user_id}")

    def add_post(self, post_id, hashtags, author_id, caption=""):
        # Store post metadata
        self.post_metadata[post_id] = {
            'hashtags': [h.lower() for h in hashtags],
            'caption': caption.lower()
        }
        
        # Extract features from post content
        features = (
            self.post_metadata[post_id]['hashtags'] +
            [word for word in self.post_metadata[post_id]['caption'].split() 
             if len(word) > 3]
        )
        
        self._update_feature_space(features)
        self._create_post_vector(post_id, features)
        
        if len(self.post_features) % 1 == 0:
            self.train_model()

    def _update_feature_space(self, features):
        new_features = set(features) - set(self.feature_space.keys())
        
        if new_features:
            for feature in new_features:
                self.feature_space[feature] = len(self.feature_space)
            # Update existing vectors
            for pid in self.post_features.copy():
                self._create_post_vector(pid, self.post_metadata[pid]['hashtags'] +
                    self.post_metadata[pid]['hashtags'] +
                    self.post_metadata[pid]['caption'].split())

    def _create_post_vector(self, post_id, features):
        vector = np.zeros(len(self.feature_space))
        for feature in set(features):
            if feature in self.feature_space:
                vector[self.feature_space[feature]] = 1
        self.post_features[post_id] = vector

    def train_model(self):
        try:
            if len(self.post_features) < 10:
                raise ValueError("Insufficient posts for training")
            
            post_ids = list(self.post_features.keys())
            X = np.array([self.post_features[pid] for pid in post_ids])
            
            self.knn_model = NearestNeighbors(
                n_neighbors=min(50, len(post_ids)),
                metric='cosine',
                algorithm='brute'
            )
            self.knn_model.fit(X)
            self.ready = True
            self._log(f"Trained with {len(post_ids)} posts")
            return True
        except Exception as e:
            self.ready = False
            self._log(f"Training failed: {str(e)}")
            return False

    def get_recommendations(self, user_id, n):
        if not self.ready or user_id not in self.user_domains:
            return []
            
        user_domains = self.user_domains[user_id]
        post_scores = []
        
        for pid, vector in self.post_features.items():
            # Score based on domain keywords in post
            score = sum(
                1 for i, val in enumerate(vector)
                if val == 1 and 
                list(self.feature_space.keys())[i] in user_domains
            )
            post_scores.append((pid, score))
        
        # Sort by score and recency
        post_scores.sort(key=lambda x: (-x[1], -int(x[0], 16)))
        return [pid for pid, _ in post_scores[:n]]

    def handle_command(self, command):
        response = {
            "requestId": command.get("requestId"),
            "success": False,
            "ready": self.ready
        }
        
        try:
            cmd_type = command["type"]
            
            if cmd_type == "add_user":
                self.add_user(command["user_id"], command["domains"])
                response["success"] = True
                
            elif cmd_type == "add_post":
                self.add_post(
                    command["post_id"],
                    command["hashtags"],
                    command["author_id"],
                    command.get("caption", "")
                )
                response["success"] = True
                
            elif cmd_type == "train":
                response["success"] = self.train_model()
                
            elif cmd_type == "recommend":
                if self.ready:
                    recommendations = self.get_recommendations(command["user_id"], command["n"])
                    response["recommendations"] = recommendations[:command["n"]]
                    response["success"] = True
                else:
                    response["error"] = "Model not trained"
                    
            else:
                response["error"] = f"Unknown command: {cmd_type}"
                
        except Exception as e:
            response["error"] = str(e)
        
        self._send(response)
        return response

if __name__ == "__main__":
    system = MLSystem()
    system._send({"status": "ready_for_commands"})
    system._log("Python process started")

    try:
        while True:
            line = sys.stdin.readline()
            if not line: 
                break
            try:
                command = json.loads(line.strip())
                system.handle_command(command)
            except json.JSONDecodeError:
                system._log(f"Invalid JSON received: {line}")
            except Exception as e:
                system._send({"error": str(e)})
    except KeyboardInterrupt:
        system._log("Shutting down")
    finally:
        system._log("Process terminated")