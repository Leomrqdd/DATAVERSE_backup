from flask import request, jsonify
from .app import app, db, bcrypt, jwt
from .models import User, Project
from sqlalchemy import func
from datetime import datetime, timedelta
from flask_jwt_extended import create_access_token, jwt_required


jwt.init_app(app)

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    password = data.get('password')

    if not all([first_name, last_name, email, password]):
        return jsonify({'error': 'Missing required fields'}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'error': 'Email already exists. Please login instead.'}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(first_name=first_name, last_name=last_name, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Missing email or password'}), 400

    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity={'email': user.email})
        return jsonify({'token': access_token})
    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/logout', methods=['POST'])
#@jwt_required()
def logout():
    return jsonify({'message': 'Logged out'}), 200

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    user_list = [{
        'id': user.id,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
        'created_at': user.created_at.strftime('%Y-%m-%d %H:%M:%S') if user.created_at else None
    } for user in users]

    return jsonify({'users': user_list}), 200

@app.route('/projects', methods=['POST'])
#@jwt_required()
def add_project():
    data = request.get_json()
    required_fields = ['projectName', 'clientIdentity', 'company', 'communicationLevel', 
                       'clientContactFirstName', 'clientContactLastName', 'clientContactJob', 
                       'clientContactEmail', 'komodalProjectManagerFirstName', 'useCase', 
                       'budget', 'startDate', 'endDate', 'objectives', 'platformUsed', 
                       'accountsCreated', 'komodalSupportRating', 'platformRating', 
                       'komodalPlatformRating', 'komodalComment']
    missing_fields = [field for field in required_fields if field not in data]

    if missing_fields:
        return jsonify({'error': 'Missing fields', 'missing_fields': missing_fields}), 400

    new_project = Project(
        projectName=data['projectName'],
        clientIdentity=data['clientIdentity'],
        company=data.get('company'),
        communicationLevel=data.get('communicationLevel'),
        clientContactFirstName=data.get('clientContactFirstName'),
        clientContactLastName=data.get('clientContactLastName'),
        clientContactJob=data.get('clientContactJob'),
        clientContactEmail=data.get('clientContactEmail'),
        komodalProjectManagerFirstName=data.get('komodalProjectManagerFirstName'),
        useCase=data.get('useCase'),
        budget=data.get('budget'),
        startDate=data.get('startDate'),
        endDate=data.get('endDate'),
        objectives=data.get('objectives'),
        platformUsed=data.get('platformUsed'),
        accountsCreated=data.get('accountsCreated'),
        komodalSupportRating=data.get('komodalSupportRating'),
        platformRating=data.get('platformRating'),
        komodalPlatformRating=data.get('komodalPlatformRating'),
        komodalComment=data.get('komodalComment')
    )
    db.session.add(new_project)
    db.session.commit()
    return jsonify({'message': 'Project added successfully'}), 201

@app.route('/projects', methods=['GET'])
#@jwt_required()
def get_projects():
    projects = Project.query.all()
    project_list = [{
        'id': project.id,
        'projectName': project.projectName,
        'clientIdentity': project.clientIdentity,
        'company': project.company,
        'communicationLevel': project.communicationLevel,
        'clientContactFirstName': project.clientContactFirstName,
        'clientContactLastName': project.clientContactLastName,
        'clientContactJob': project.clientContactJob,
        'clientContactEmail': project.clientContactEmail,
        'komodalProjectManagerFirstName': project.komodalProjectManagerFirstName,
        'useCase': project.useCase,
        'budget': project.budget,
        'startDate': project.startDate,
        'endDate': project.endDate,
        'objectives': project.objectives,
        'platformUsed': project.platformUsed,
        'accountsCreated': project.accountsCreated,
        'komodalSupportRating': project.komodalSupportRating,
        'platformRating': project.platformRating,
        'komodalPlatformRating': project.komodalPlatformRating,
        'komodalComment': project.komodalComment,
        'created_at': project.created_at.strftime('%Y-%m-%d %H:%M:%S') if project.created_at else None
    } for project in projects]

    return jsonify({'projects': project_list}), 200

@app.route('/projects/<int:project_id>', methods=['GET', 'PUT'])
#@jwt_required()
def update_project(project_id):
    if request.method == 'GET':
        project = Project.query.get(project_id)
        if not project:
            return jsonify({'error': 'Project not found'}), 404

        project_data = {
            'projectName': project.projectName,
            'clientIdentity': project.clientIdentity,
            'company': project.company,
            'communicationLevel': project.communicationLevel,
            'clientContactFirstName': project.clientContactFirstName,
            'clientContactLastName': project.clientContactLastName,
            'clientContactJob': project.clientContactJob,
            'clientContactEmail': project.clientContactEmail,
            'komodalProjectManagerFirstName': project.komodalProjectManagerFirstName,
            'useCase': project.useCase,
            'budget': project.budget,
            'startDate': project.startDate,
            'endDate': project.endDate,
            'objectives': project.objectives,
            'platformUsed': project.platformUsed,
            'accountsCreated': project.accountsCreated,
            'komodalSupportRating': project.komodalSupportRating,
            'platformRating': project.platformRating,
            'komodalPlatformRating': project.komodalPlatformRating,
            'komodalComment': project.komodalComment
        }

        return jsonify(project_data), 200

    elif request.method == 'PUT':
        data = request.get_json()
        
        project = Project.query.get(project_id)
        if not project:
            return jsonify({'error': 'Project not found'}), 404

        project.projectName = data.get('projectName', project.projectName)
        project.clientIdentity = data.get('clientIdentity', project.clientIdentity)
        project.company = data.get('company', project.company)
        project.communicationLevel = data.get('communicationLevel', project.communicationLevel)
        project.clientContactFirstName = data.get('clientContactFirstName', project.clientContactFirstName)
        project.clientContactLastName = data.get('clientContactLastName', project.clientContactLastName)
        project.clientContactJob = data.get('clientContactJob', project.clientContactJob)
        project.clientContactEmail = data.get('clientContactEmail', project.clientContactEmail)
        project.komodalProjectManagerFirstName = data.get('komodalProjectManagerFirstName', project.komodalProjectManagerFirstName)
        project.useCase = data.get('useCase', project.useCase)
        project.budget = data.get('budget', project.budget)
        project.startDate = data.get('startDate', project.startDate)
        project.endDate = data.get('endDate', project.endDate)
        project.objectives = data.get('objectives', project.objectives)
        project.platformUsed = data.get('platformUsed', project.platformUsed)
        project.accountsCreated = data.get('accountsCreated', project.accountsCreated)
        project.komodalSupportRating = data.get('komodalSupportRating', project.komodalSupportRating)
        project.platformRating = data.get('platformRating', project.platformRating)
        project.komodalPlatformRating = data.get('komodalPlatformRating', project.komodalPlatformRating)
        project.komodalComment = data.get('komodalComment', project.komodalComment)
        
        db.session.commit()

        return jsonify({'message': 'Project updated successfully'}), 200

@app.route('/projects/<int:project_id>', methods=['DELETE'])
#@jwt_required()
def delete_project(project_id):
    project = Project.query.get(project_id)
    if not project:
        return jsonify({'error': 'Project not found'}), 404

    db.session.delete(project)
    db.session.commit()

    return jsonify({'message': 'Project deleted successfully'}), 200

@app.route('/analytics/users', methods=['GET'])
def user_stats():
   
    six_months_ago = datetime.utcnow() - timedelta(days=180)
    new_users_data = db.session.query(func.count(User.id)).filter(User.created_at >= six_months_ago).group_by(func.month(User.created_at)).all()
    user_details = User.query.order_by(User.created_at.desc()).limit(10).all()

    return jsonify({
        'newUsersData': [count for (count,) in new_users_data],
        'userDetails': [{'id': user.id, 'first_name': user.first_name, 'last_name': user.last_name, 'email': user.email, 'created_at': user.created_at.strftime('%Y-%m-%d %H:%M:%S')} for user in user_details]
    })

@app.route('/analytics/projects', methods=['GET'])
def project_stats():
    
    active_projects = Project.query.filter_by(status='Active').count()
    completed_projects = Project.query.filter_by(status='Completed').count()

    return jsonify({
        'activeVsCompleted': [active_projects, completed_projects]
    })

@app.route('/profile', methods=['PUT'])
#@jwt_required()
def update_profile():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user['email']).first()

    data = request.get_json()
    user.first_name = data.get('first_name', user.first_name)
    user.last_name = data.get('last_name', user.last_name)
    db.session.commit()

    return jsonify({'message': 'Profile updated successfully'}), 200

@app.route('/projects/filter', methods=['GET'])
def filter_projects():
    filters = request.args.to_dict()
    query = Project.query
    
    project_name = filters.get('projectName')
    if project_name:
        query = query.filter(Project.projectName.ilike(f"%{project_name}%"))
    
    use_case = filters.get('useCase')
    if use_case:
        query = query.filter(Project.useCase.ilike(f"%{use_case}%"))
    
    budget = filters.get('budget')
    if budget:
        # Filtrage par intervalle de budget
        min_budget, max_budget = budget.split('-')
        query = query.filter(Project.budget >= min_budget, Project.budget <= max_budget)
    
    platform_used = filters.get('platformUsed')
    if platform_used:
        query = query.filter(Project.platformUsed.ilike(f"%{platform_used}%"))
    
    start_date = filters.get('startDate')
    end_date = filters.get('endDate')
    if start_date:
        start_date = datetime.strptime(start_date, '%Y-%m-%d')
        query = query.filter(Project.startDate >= start_date)
    if end_date:
        end_date = datetime.strptime(end_date, '%Y-%m-%d')
        query = query.filter(Project.endDate <= end_date)

    client_identity = filters.get('clientIdentity')
    if client_identity:
        query = query.filter(Project.clientIdentity.ilike(f"%{client_identity}%"))
    
    company = filters.get('company')
    if company:
        query = query.filter(Project.company.ilike(f"%{company}%"))
    
    communication_level = filters.get('communicationLevel')
    if communication_level:
        query = query.filter(Project.communicationLevel.ilike(f"%{communication_level}%"))
    
    client_contact_job = filters.get('clientContactJob')
    if client_contact_job:
        query = query.filter(Project.clientContactJob.ilike(f"%{client_contact_job}%"))

    objectives = filters.get('objectives')
    if objectives:
        query = query.filter(Project.objectives.ilike(f"%{objectives}%"))

    accounts_created = filters.get('accountsCreated')
    if accounts_created:
        min_accounts, max_accounts = accounts_created.split('-')
        query = query.filter(Project.accountsCreated >= min_accounts, Project.accountsCreated <= max_accounts)

    komodal_support_rating = filters.get('komodalSupportRating')
    if komodal_support_rating:
        query = query.filter(Project.komodalSupportRating == int(komodal_support_rating))

    platform_rating = filters.get('platformRating')
    if platform_rating:
        query = query.filter(Project.platformRating == int(platform_rating))

    komodal_platform_rating = filters.get('komodalPlatformRating')
    if komodal_platform_rating:
        query = query.filter(Project.komodalPlatformRating == int(komodal_platform_rating))

    komodal_comment = filters.get('komodalComment')
    if komodal_comment:
        query = query.filter(Project.komodalComment.ilike(f"%{komodal_comment}%"))

    projects = query.all()

    project_list = [{
        'id': project.id,
        'projectName': project.projectName,
        'clientIdentity': project.clientIdentity,
        'company': project.company,
        'communicationLevel': project.communicationLevel,
        'clientContactFirstName': project.clientContactFirstName,
        'clientContactLastName': project.clientContactLastName,
        'clientContactJob': project.clientContactJob,
        'clientContactEmail': project.clientContactEmail,
        'komodalProjectManagerFirstName': project.komodalProjectManagerFirstName,
        'useCase': project.useCase,
        'budget': project.budget,
        'startDate': project.startDate,
        'endDate': project.endDate,
        'objectives': project.objectives,
        'platformUsed': project.platformUsed,
        'accountsCreated': project.accountsCreated,
        'komodalSupportRating': project.komodalSupportRating,
        'platformRating': project.platformRating,
        'komodalPlatformRating': project.komodalPlatformRating,
        'komodalComment': project.komodalComment,
        'created_at': project.created_at.strftime('%Y-%m-%d %H:%M:%S') if project.created_at else None
    } for project in projects]

    return jsonify({'projects': project_list}), 200