<?php
namespace MultiForm;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Silex\Application;
use Silex\ControllerProviderInterface;

class MultiFormController implements ControllerProviderInterface
{
    public function connect(Application $app)
    {
         // @var \Silex\ControllerCollection $factory
         $factory = $app['controllers_factory'];

         $factory->get('/','MultiForm\MultiFormController::getAll');
         $factory->post('/','MultiForm\MultiFormController::saveForms');

         $factory->get('/{table}/','MultiForm\MultiFormController::getAllFrom');
         $factory->post('/{table}/','MultiForm\MultiFormController::saveForm');
         $factory->put('/{table}/{id}','MultiForm\MultiFormController::saveForm');
         $factory->delete('/{table}/{id}','MultiForm\MultiFormController::deleteForm');

         return $factory;
    }

    public function getAll(Application $app)
    {
		$tables = $app['db']->inspect();
		$r = array();
		foreach ($tables as $table) {
			$r[] = array('name' => $table);
		}
	 	return $app->json($r);
	}

    public function saveForms(Request $request, Application $app)
    {
	 	$name = trim($request->request->get('name'));
		$fields = $request->request->get('fields');
		$form = $app['db']->dispense($name);
		foreach ($fields as $field) {
			foreach ($field as $k => $v) {
				if ('name' == $k) {
					$form[trim($v)] = $k;
				}
			}
		}
		try {
			$response['success'] = true;
			$response['message'] = $app['db']->store($form);
		} catch (Exception $e) {
			$response['success'] = false;
			$response['message'] = $e->getMessage();
		}
	 	return $app->json($response);
    }

	public function getAllFrom (Application $app, $table)
    {
 		$data = $app['db']->getAll("SELECT * FROM $table");

		if (empty($data)) {
 			$data[0] = $app['db']->inspect($table);
		} else {
 			foreach ($data as $d => &$k) {
 				$id = $k['id'];
 				$k['actions'] = <<<ACTIONS
<a class="edit" href="javascript:void(0)" title="Edit" id="$id">
    <i class="glyphicon glyphicon-pencil"></i>
</a>
<a class="remove ml10" href="javascript:void(0)" title="Remove" id="$id">
    <i class="glyphicon glyphicon-trash"></i>
</a>
ACTIONS;
	 		}
		}
	 	return  $app->json($data);
	}

    public function saveForm(Request $request, Application $app, $table, $id=null)
    {
        $fields = $request->request;
        if (is_null($id)){
		  $form = $app['db']->dispense($table);
        } else {
		  $form = $app['db']->load($table, $id);
        }
		foreach ($fields as $field) {
			if (!empty($field['name']) && 
				!empty($field['value']) && 
				'id' !== $field['name']) {
				$form[trim($field['name'])] = $field['value'];
			}
		}
		try {
			$response['success'] = true;
			$response['message'] = $app['db']->store($form);
		} catch (Exception $e) {
			$response['success'] = false;
			$response['message'] = $e->getMessage();
		}
	 	return $app->json($response);
    }

    public function deleteForm(Application $app, $table, $id)
    {
		$bean = $app['db']->load($table,$id);
		try {
			$response['success'] = true;
			$response['message'] = $app['db']->trash($bean);
		} catch (Exception $e) {
			$response['success'] = false;
			$response['message'] = $e->getMessage();
		}
	 	return $app->json($response);
    }
}