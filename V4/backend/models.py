from .app import db, bcrypt
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)
class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    projectName = db.Column(db.String(100), nullable=False)
    clientIdentity = db.Column(db.String(100), nullable=False)
    company = db.Column(db.String(100))
    communicationLevel = db.Column(db.String(100))
    clientContactFirstName = db.Column(db.String(50))
    clientContactLastName = db.Column(db.String(50))
    clientContactJob = db.Column(db.String(100))
    clientContactEmail = db.Column(db.String(100))
    komodalProjectManagerFirstName = db.Column(db.String(50))
    useCase = db.Column(db.String(100))
    budget = db.Column(db.String(50))
    startDate = db.Column(db.String(50))
    endDate = db.Column(db.String(50))
    objectives = db.Column(db.Text)
    platformUsed = db.Column(db.String(100))
    accountsCreated = db.Column(db.String(50))
    komodalSupportRating = db.Column(db.String(10))
    platformRating = db.Column(db.String(10))
    komodalPlatformRating = db.Column(db.String(10))
    komodalComment = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
