class Api::UsersController < ApplicationController
  def show
  end

  def index
    @users = User.all
    render :index
  end
end
