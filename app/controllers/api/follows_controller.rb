class Api::FollowsController < ApplicationController

  def new

  end

  def index
    @follows = Follow.includes(:author, :subject).all.order('"created_at" DESC')
  end

  def create
    @follow = Follow.new(follow_params)

    @follow.author_id = current_user.id

    if @follow.save
      render json: @follow
    else
      render json: @follow.errors.full_messages, status: 422
    end
  end

    def show
      @follow = Follow.find(params[:id])
    end

    def destroy
     @follow = Follow.find(params[:id])
     @follow.destroy
     render :show
    end

  private

  def follow_params
    params.require(:follow).permit(
      :followed_user_id
    )
  end


end
